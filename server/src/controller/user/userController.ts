import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { User } from "../../models/userModel";
import { createError } from "../../utils/error";
import { errorCode } from "../../config/errorCode";
import generateToken from "../../utils/generateToken";
import { CustomRequest } from "../../types/customRequest";
import { deleteImage, uploadSingleImage } from "../../utils/cloudinary";
import { checkUserIfNotExist } from "../../utils/auth";

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

// @route POST | api/upload-avatar
// @desc update or Upload user avatar
// @access Private
export const uploadAvatar = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userInfo = req.user;
    const { image_url } = req.body;

    const userDoc = await User.findById(userInfo?._id);
    if (!userDoc) {
      return next(createError("User not found", 404, errorCode.NotFound));
    }

    // Delete old avatar with public id
    if (userDoc?.avatar) {
      await deleteImage(userDoc.avatar[0].public_alt);
    }

    const response = await uploadSingleImage(image_url, "eShop.com/avatar");

    // if (response?.result !== "ok") {
    //   return next(
    //     createError("Image upload failed", 400, errorCode.invalid)
    //   );
    // }

    await User.findByIdAndUpdate(userDoc?._id, {
      avatar: {
        url: response.image_url,
        public_alt: response.public_alt,
      },
    });

    res.status(200).json({ message: "Avatar Uploaded." });
  }
);

// @route GET | api/users/get-user-info
// desc Get login user's information
// @access Private
export const getUserInfo = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { user } = req;

    const userDoc = await User.findById(user?._id).select("-password");
    checkUserIfNotExist(userDoc);

    res.status(200).json(userDoc);
  }
);

// @route POST | api/update-email
// desc Update user's email
// @access Private
export const updateEmailAddress = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const { email } = req.body;

    const userDoc = await User.findById(user?._id);
    checkUserIfNotExist(userDoc);

    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return next(
        createError(
          "User already exists with this email address!",
          400,
          errorCode.emailExist
        )
      );
    }

    await User.findByIdAndUpdate(userDoc?._id, { email });

    res.status(200).json({ message: "Email updated successfully" });
  }
);

// @route POST | api/users/update-name
// desc Update user's name
// @access Private
export const updateName = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const { name } = req.body;

    const userDoc = await User.findById(user?._id);
    checkUserIfNotExist(userDoc);

    const existingName = await User.findOne({ name });
    if (existingName) {
      return next(
        createError(
          "User already exists with this name!",
          400,
          errorCode.nameExist
        )
      );
    }

    await User.findByIdAndUpdate(userDoc?._id, { name });

    res.status(200).json({ message: "Name updated successfully" });
  }
);
