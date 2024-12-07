import { TRPCError } from "@trpc/server";
import cloudinary from "cloudinary";

// Cloudinaryの設定
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Cloudinaryに画像をアップロード
 * @param base64Image base64形式の画像
 * @returns 画像のURL
 */
export const createCloudImage = async (base64Image: string) => {
  try {
    const imageResponse = await cloudinary.v2.uploader.upload(base64Image, {
      folder: "user",
      transformation: { width: 400, height: 400, crop: "fill" },
      resource_type: "image",
    });
    return imageResponse.secure_url;
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "画像のアップロードに失敗しました",
    });
  }
};

/**
 * Cloudinaryの画像を削除
 * @param publicId Cloudinaryのpublic_id
 */
export const deleteCloudImage = async (publicId: string) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "画像の削除に失敗しました",
    });
  }
};
