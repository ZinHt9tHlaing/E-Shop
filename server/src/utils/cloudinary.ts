import { v2 as cloudinary } from "cloudinary";

import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadSingleImage = async (image: string, folder_name: string) => {
  const response = await cloudinary.uploader.upload(image, {
    folder: folder_name,
  });

  // console.log("cloudinary", response);

  return {
    image_url: response.secure_url,
    public_alt: response.public_id,
  };
};

export const deleteImage = async (public_alt: string) => {
  const response = await cloudinary.uploader.destroy(public_alt);

  return response?.result === "ok"; // return boolean
};
