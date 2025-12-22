import express, { Router, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../controller/product/productController";
import { authMiddleware, isAdmin } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { deleteProductValidator, updateProductValidator } from "../../validators/productValidators";

export const productRoutes: Router = express.Router();

productRoutes.post("/create-product", authMiddleware, isAdmin, createProduct);
productRoutes.put(
  "/update-product/:id",
  authMiddleware,
  isAdmin,
  updateProductValidator,
  validateRequest,
  updateProduct
);
productRoutes.delete(
  "/delete-product/:id",
  authMiddleware,
  isAdmin,
  deleteProductValidator,
  validateRequest,
  deleteProduct
);
