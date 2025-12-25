import { body, param } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// profile
export const uploadImageValidator = [
  body("image_url").notEmpty().withMessage("Image is required"),
];

export const updateEmailValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
];

export const updateNameValidator = [
  body("name").notEmpty().withMessage("Name is required"),
];

export const updatePasswordValidator = [
  body("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Old password must be at least 6 characters"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];
