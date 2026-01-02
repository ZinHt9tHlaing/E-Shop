import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { Product } from "../../models/products/product";
import { createError } from "../../utils/error";
import { errorCode } from "../../config/errorCode";
import { CustomRequest } from "../../types/customRequest";
import { User } from "../../models/userModel";
import { getUserById } from "../../services/authServices";
import { checkUserIfNotExist } from "../../utils/auth";
import { deleteImage, uploadSingleImage } from "../../utils/cloudinary";

// @route POST | api/products
// @desc Add new product
// @access Private/Admin
export const createProduct = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { name, description, category } = req.body;

    const sizes = Array.isArray(req.body.sizes)
      ? req.body.sizes
      : [req.body.sizes]; // Convert to array
    const colors = Array.isArray(req.body.colors)
      ? req.body.colors
      : [req.body.colors];

    // Convert to Number
    const price = Number(req.body.price);
    const instock_count = Number(req.body.instock_count);
    const rating_count = Number(req.body.rating_count);

    const images = req.files as Express.Multer.File[];

    // Convert to boolean
    const is_feature = req.body.is_feature === "true";
    const is_new_arrival = req.body.is_new_arrival === "true";

    const updatedImages = await Promise.all(
      images.map(async (image) => {
        // buffer -> base64
        const base64 = image.buffer.toString("base64");

        const uploadImg = await uploadSingleImage(
          `data:${image.mimetype};base64,${base64}`,
          "eShop.com/products"
        ); // Upload to cloudinary as base64 string

        return {
          url: uploadImg.image_url,
          public_alt: uploadImg.public_alt,
        };
      })
    );

    const newProducts = await Product.create({
      name,
      description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images: updatedImages,
      is_new_arrival,
      is_feature,
      rating_count,
      userId: req.user?._id,
    });

    if (!newProducts) {
      return next(
        createError("Failed to create product", 500, errorCode.invalid)
      );
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
    const { name, description, category, existingImages } = req.body;

    const sizes = Array.isArray(req.body.sizes)
      ? req.body.sizes
      : [req.body.sizes];
    const colors = Array.isArray(req.body.colors)
      ? req.body.colors
      : [req.body.colors];

    const price = Number(req.body.price);
    const instock_count = Number(req.body.instock_count);
    const rating_count = Number(req.body.rating_count);

    const is_feature = req.body.is_feature === "true";
    const is_new_arrival = req.body.is_new_arrival === "true";

    // parse existing images
    const keepExistingImages = existingImages ? JSON.parse(existingImages) : [];

    // new images
    const newImages = req.files as Express.Multer.File[];

    const productId = req.params.id;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return next(createError("Product not found", 404, errorCode.NotFound));
    }

    // existing product image from db -> [{url:image_url,public_alt:abcd},{url:image_url,public_alt:efgh}]
    // existing image -> [{url:image_url,public_alt:abcd}]
    // [{url:image_url,public_alt:abcd}] existing images
    // [{url:image_url,public_alt:efgh}] image to delete

    // find images to delete from cloud
    const imagesToDelete = existingProduct.images.filter((existingImg) => {
      return !keepExistingImages.some(
        (keepImg: any) => keepImg.public_alt === existingImg.public_alt
      );
    });

    if (imagesToDelete.length > 0) {
      await Promise.all(
        imagesToDelete.map(async (image) => {
          if (image.public_alt) {
            try {
              await deleteImage(image.public_alt);
            } catch (error) {
              console.log(`Failed to delete image: ${image.public_alt}`, error);
            }
          }
        })
      );
    }

    // upload new images
    let uploadedNewImages: any[] = [];
    if (newImages && newImages.length > 0) {
      uploadedNewImages = await Promise.all(
        newImages.map(async (image) => {
          // buffer -> base64
          const base64 = image.buffer.toString("base64");

          const uploadImg = await uploadSingleImage(
            `data:${image.mimetype};base64,${base64}`,
            "eShop.com/products"
          ); // Upload to cloudinary as base64 string

          return {
            url: uploadImg.image_url,
            public_alt: uploadImg.public_alt,
          };
        })
      );
    }

    const finalImages = [...keepExistingImages, ...uploadedNewImages];

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.instock_count =
      instock_count || existingProduct.instock_count;
    existingProduct.category = category || existingProduct.category;
    existingProduct.sizes = sizes || existingProduct.sizes;
    existingProduct.colors = colors || existingProduct.colors;
    existingProduct.images = finalImages;
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

    const imagesToDeleteWithPublicAltOnly = existingProduct.images.map(
      (img) => img.public_alt
    );

    try {
      await existingProduct.deleteOne();

      if (imagesToDeleteWithPublicAltOnly.length > 0) {
        await Promise.all(
          imagesToDeleteWithPublicAltOnly.map(async (imageAlt) => {
            try {
              await deleteImage(imageAlt);
            } catch (error) {
              console.log(`Failed to delete image: ${imageAlt}`, error);
            }
          })
        );
      }

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(
        createError("Fail to delete product", 500, errorCode.invalid)
      );
    }
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
      const sizes = Array.isArray(size) ? size : [size];
      query.sizes = { $in: sizes };
    }

    if (color) {
      const colors = Array.isArray(color) ? color : [color];
      query.colors = { $in: colors };
    }

    // sorting
    let sortOption: any = {};
    if (sortBy === "price_asc") sortOption.price = 1;
    if (sortBy === "price_desc") sortOption.price = -1;
    if (sortBy === "latest") sortOption.createdAt = -1;
    if (sortBy === "rating") sortOption.rating_count = -1;

    const products = await Product.find(query).sort(sortOption);
    const totalCount = products.length;

    res.status(200).json(products);
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
      data: products,
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
      data: products,
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

    res.status(200).json(product);
  }
);

// @route GET | api/products/filters/meta
// @desc Get products meta data.
// @access Public
export const getProductsMeta = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const colors = await Product.distinct("colors"); // get unique colors
    const sizes = await Product.distinct("sizes");

    const priceRange = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);

    res.status(200).json({
      colors,
      sizes,
      minPrice: priceRange[0]?.minPrice || 0,
      maxPrice: priceRange[0]?.maxPrice || 0,
    });
  }
);
