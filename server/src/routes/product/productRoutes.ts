import express, { Router, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../controller/product/productController";
import { authMiddleware, isAdmin } from "../../middlewares/authMiddleware";

export const productRoutes: Router = express.Router();

productRoutes.post("/create-product", authMiddleware, isAdmin, createProduct);
productRoutes.put("/update-product/:id", authMiddleware, isAdmin, updateProduct);
productRoutes.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);
