import { Request, Response, NextFunction } from "express";

type ControllerFnType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const asyncHandler = (controllerFn: ControllerFnType) => {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(controllerFn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
