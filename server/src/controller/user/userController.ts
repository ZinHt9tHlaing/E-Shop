import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { User } from "../../models/userModel";
import { createError } from "../../utils/error";
import { validationResult } from "express-validator";
import { errorCode } from "../../config/errorCode";
import generateToken from "../../utils/generateToken";

// @route POST | api/register
// @desc Register new user
// @access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        createError(
          "User already exists with this email address!",
          400,
          errorCode.userExist
        )
      );
    }

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      message: "User registered successfully",
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  }
);

// @route POST | api/login
// @desc Login to existing user's account.
// @access Public
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    const comparedPassword = await existingUser?.matchPassword(password);
    console.log(!comparedPassword);

    // If user not found and password doesn't match
    if (!existingUser || !comparedPassword) {
      return next(
        createError(
          "User not found with this credentials!",
          401,
          errorCode.NotFound
        )
      );
    }

    generateToken(res, existingUser!._id);

    res.status(200).json({
      message: "User logged in successfully",
      _id: existingUser?._id,
      name: existingUser?.name,
      email: existingUser?.email,
      role: existingUser?.role,
    });
  }
);

// @route POST | api/logout
// @desc Clear token.
// @access Public
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ message: "User logged out successfully" });
});
