import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { Product } from "../../models/products/product";
import { createError } from "../../utils/error";
import { errorCode } from "../../config/errorCode";
import { CustomRequest } from "../../types/customRequest";
import { User } from "../../models/userModel";
import { getUserById } from "../../services/authServices";
import { checkUserIfNotExist } from "../../utils/auth";

// @route POST | api/products
// @desc Add new product
// @access Private/Admin
export const createProduct = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images,
      is_new_arrival,
      is_feature,
      rating_count,
    } = req.body;

    const userId = req.user?._id;

    const existingUser = await getUserById(userId!);
    checkUserIfNotExist(existingUser);

    const newProducts = await Product.create({
      name,
      description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images,
      is_new_arrival,
      is_feature,
      rating_count,
      userId: existingUser?._id,
    });

    if (!newProducts) {
      return next(createError("Something went wrong", 500, errorCode.invalid));
    }

    res.status(201).json({
      message: "Product created successfully",
    });
  }
);

// @route PUT | api/products/:id
// @desc Update an existing product.
// @access Private/Admin
export const updateProduct = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images,
      is_new_arrival,
      is_feature,
      rating_count,
    } = req.body;

    const userId = req.user?._id;
    const productId = req.params.id;

    const existingUser = await getUserById(userId!);
    checkUserIfNotExist(existingUser);

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return next(createError("Product not found", 404, errorCode.NotFound));
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.instock_count =
      instock_count || existingProduct.instock_count;
    existingProduct.category = category || existingProduct.category;
    existingProduct.sizes = sizes || existingProduct.sizes;
    existingProduct.colors = colors || existingProduct.colors;
    existingProduct.images = images || existingProduct.images;
    existingProduct.is_new_arrival =
      is_new_arrival || existingProduct.is_new_arrival;
    existingProduct.is_feature = is_feature || existingProduct.is_feature;
    existingProduct.rating_count = rating_count || existingProduct.rating_count;

    const updatedProduct = await existingProduct.save();

    res.status(200).json({
      message: "Product Updated successfully",
      updatedProduct,
    });
  }
);

// @route DELETE | api/products/:id
// @desc Delete an existing product.
// @access Private/Admin
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return next(createError("Product not found", 404, errorCode.NotFound));
    }

    await existingProduct.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  }
);

// @route GET | api/products/get-products-filter
// @desc Get all products with filters.
// @access Public
export const getProductsWithFilter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { keyword, category, minPrice, maxPrice, size, color, sortBy } =
      req.query;

    let query: any = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (size) {
      query.sizes = { $in: [size] };
    }

    if (color) {
      query.colors = { $in: [size] };
    }

    // sorting
    let sortOption: any = {};
    if (sortBy === "price_asc") sortOption.price = 1;
    if (sortBy === "price_desc") sortOption.price = -1;
    if (sortBy === "latest") sortOption.createdAt = -1;
    if (sortBy === "rating") sortOption.rating_count = -1;

    const products = await Product.find(query).sort(sortOption);
    const totalCount = products.length;

    res.status(200).json({
      message: "Get All Products with Filter.",
      count: totalCount,
      products,
    });
  }
);

// @route GET | api/products/get-products-new-arrival
// @desc Get New Arrival products
// @access Public
export const getNewArrivalsProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({ is_new_arrival: true }).sort({
      createdAt: -1,
    });
    const totalCount = products.length;

    res.status(200).json({
      message: "Get New Arrival Products.",
      totalCount,
      NewArrivals: products,
    });
  }
);

// @route GET | api/products/get-products-featured
// @desc Get Featured products
// @access Public
export const getFeaturedProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({ is_feature: true }).sort({
      createdAt: -1,
    });
    const totalCount = products.length;

    res.status(200).json({
      message: "Get Featured Products.",
      totalCount,
      FeaturedProducts: products,
    });
  }
);

// @route GET | api/products/:id
// @desc Get product by id.
// @access Public
export const getProductById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return next(createError("Product not found", 404, errorCode.NotFound));
    }

    res.status(200).json({
      message: "Get Detail Product.",
      product,
    });
  }
);
