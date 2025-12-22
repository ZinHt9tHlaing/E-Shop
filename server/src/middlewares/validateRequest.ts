import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { createError } from "../utils/error";
import { errorCode } from "../config/errorCode";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(createError(result.array()[0].msg, 400, errorCode.invalid));
  }

  next();
};
