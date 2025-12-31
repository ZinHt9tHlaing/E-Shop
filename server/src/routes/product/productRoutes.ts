import express, { Router, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivalsProducts,
  getProductById,
  getProductsMeta,
  getProductsWithFilter,
  updateProduct,
} from "../../controller/product/productController";
import { authMiddleware, isAdmin } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  deleteProductValidator,
  updateProductValidator,
} from "../../validators/productValidators";
import { upload } from "../../utils/upload";

export const productRoutes: Router = express.Router();

productRoutes.post(
  "/create-product",
  authMiddleware,
  isAdmin,
  upload.array("images"),
  createProduct
);
productRoutes.put(
  "/update-product/:id",
  authMiddleware,
  isAdmin,
  updateProductValidator,
  validateRequest,
  upload.array("images"),
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

productRoutes.get("/get-filter-products", getProductsWithFilter);
productRoutes.get("/get-new-arrival-products", getNewArrivalsProducts);
productRoutes.get("/get-featured-products", getFeaturedProducts);
productRoutes.get("/:id", getProductById);
productRoutes.get("/filters/meta", getProductsMeta);
