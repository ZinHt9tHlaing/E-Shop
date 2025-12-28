import mongoose from "mongoose";
import { products } from "./data";
import { Product } from "../models/products/product";
import "dotenv/config";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_LOCAL_URI!);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Products seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();