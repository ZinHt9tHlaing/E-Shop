import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let DB_CONNECTION_STRING = "";

    if (process.env.NODE_ENV === "development") {
      DB_CONNECTION_STRING = process.env.MONGODB_LOCAL_URI!;
    }
    if (process.env.NODE_ENV === "production") {
      DB_CONNECTION_STRING = process.env.MONGODB_ATLAS_URI!;
    }

    const response = await mongoose.connect(DB_CONNECTION_STRING);
    console.log("Connected to database", response.connection.host);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};
