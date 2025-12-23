import express, { Router, Request, Response } from "express";

import {
  loginUser,
  logout,
  registerUser,
} from "../../controller/user/userController";
import {
  loginValidator,
  registerValidator,
} from "../../validators/userValidators";
import { validateRequest } from "../../middlewares/validateRequest";

export const userRoute: Router = express.Router();

userRoute.post("/register", registerValidator, validateRequest, registerUser);
userRoute.post("/login", loginValidator, validateRequest, loginUser);
userRoute.delete("/logout", logout);
