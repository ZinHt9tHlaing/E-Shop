import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createError } from "../utils/error";
import { errorCode } from "../config/errorCode";
import { CustomRequest, UserTypes } from "../types/customRequest";
import { User } from "../models/userModel";

export const authMiddleware = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.token;

    // If token doesn't exist
    if (!token) {
      return next(
        createError(
          "Not authorized to access this route",
          401,
          errorCode.unauthorized
        )
      );
    }

    try {
      // Verify token
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      // If token is invalid
      if (!decodedToken) {
        return next(
          createError(
            "Not authorized to access this route",
            401,
            errorCode.unauthorized
          )
        );
      }

      req.user = (await User.findById(decodedToken.userId).select(
        "-password"
      )) as UserTypes;

      next();
    } catch (error) {
      console.log("error", error);
      return next(
        createError(
          "Not authorized to access this route",
          401,
          errorCode.unauthorized
        )
      );
    }
  }
);

export const isAdmin = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
      return next(
        createError(
          "Not authorized to access this route",
          401,
          errorCode.unauthorized
        )
      );
    }

    next();
  }
);
