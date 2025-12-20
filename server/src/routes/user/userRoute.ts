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

export const userRoute: Router = express.Router();

userRoute.post("/register", registerValidator, registerUser);
userRoute.post("/login", loginValidator, loginUser);
userRoute.post("/logout", logout);
