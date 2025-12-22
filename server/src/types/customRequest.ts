import { Request } from "express";
import { Types } from "mongoose";

export interface UserTypes {
  name: string;
  email: string;
  _id: string | Types.ObjectId;
  role: "admin" | "customer";
}

export interface CustomRequest extends Request {
  user?: UserTypes;
}
