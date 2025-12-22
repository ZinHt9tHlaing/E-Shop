import { Types } from "mongoose";
import { User } from "../models/userModel";

export const getUserById = async (id: string | Types.ObjectId) => {
  return User.findById(id);
};
