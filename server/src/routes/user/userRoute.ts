import express, { Router, Request, Response } from "express";

import {
  getUserInfo,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  sendForgotPasswordEmail,
  updateEmailAddress,
  updateName,
  updatePassword,
  uploadAvatar,
} from "../../controller/user/userController";
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resetPasswordValidator,
  updateEmailValidator,
  updateNameValidator,
  updatePasswordValidator,
  uploadImageValidator,
} from "../../validators/userValidators";
import { validateRequest } from "../../middlewares/validateRequest";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const userRoute: Router = express.Router();

userRoute.post("/register", registerValidator, validateRequest, registerUser);
userRoute.post("/login", loginValidator, validateRequest, loginUser);
userRoute.delete("/logout", logout);

// profile
userRoute.post(
  "/upload-avatar",
  authMiddleware,
  uploadImageValidator,
  validateRequest,
  uploadAvatar
);

userRoute.get("/get-user-info", authMiddleware, getUserInfo);

userRoute.put(
  "/update-email",
  authMiddleware,
  updateEmailValidator,
  validateRequest,
  updateEmailAddress
);

userRoute.put(
  "/update-name",
  authMiddleware,
  updateNameValidator,
  validateRequest,
  updateName
);

userRoute.put(
  "/update-password",
  authMiddleware,
  updatePasswordValidator,
  validateRequest,
  updatePassword
);

userRoute.post(
  "/forgot-password",
  forgotPasswordValidator,
  validateRequest,
  sendForgotPasswordEmail
);

userRoute.put(
  "/reset-password/:token",
  resetPasswordValidator,
  validateRequest,
  resetPassword
);
