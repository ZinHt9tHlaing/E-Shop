import { errorCode } from "../config/errorCode";

export const checkUserIfNotExist = (user: any) => {
  if (!user) {
    const error: any = new Error("This User has not registered.");
    error.status = 401;
    error.code = errorCode.unauthenticated;
    throw error;
  }
};
