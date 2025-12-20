import { Request, Response, NextFunction } from "express";

// export const errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode).json({
//     message: error.message,
//     stack: process.env.NODE_ENV === "production" ? null : error.stack
//   });
// };

export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  const errorCode = error.code || "Error_Code";

  res.status(status).json({ message, error: errorCode });
  next();
};