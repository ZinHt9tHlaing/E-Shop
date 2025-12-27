import express, { Router, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivalsProducts,
  getProductById,
  getProductsWithFilters,
  updateProduct,
} from "../../controller/product/productController";
import { authMiddleware, isAdmin } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  deleteProductValidator,
  updateProductValidator,
} from "../../validators/productValidators";

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

productRoutes.get("/get-products-filter", getProductsWithFilters);
productRoutes.get("/get-products-new-arrival", getNewArrivalsProducts);
productRoutes.get("/get-products-featured", getFeaturedProducts);
productRoutes.get("/:id", getProductById);
