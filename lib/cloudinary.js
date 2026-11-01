import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary server-side instance securely
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a buffer or data URI to Cloudinary in a specified folder.
 * @param {Buffer | string} fileBufferOrUri - File buffer or base64 data URI
 * @param {string} folder - Target subfolder (e.g. "nylex/projects")
 * @param {string} [customPublicId] - Optional custom public ID
 * @returns {Promise<{ url: string, public_id: string, format: string, width: number, height: number }>}
 */
export async function uploadToCloudinary(fileBufferOrUri, folder = "nylex/uploads", customPublicId = null) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary credentials are not configured in environment variables.");
  }

  const options = {
    folder,
    resource_type: "auto",
    ...(customPublicId ? { public_id: customPublicId } : {}),
  };

  if (typeof fileBufferOrUri === "string") {
    // Data URI or remote URL
    const result = await cloudinary.uploader.upload(fileBufferOrUri, options);
    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  }

  // Buffer upload stream
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve({
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      });
    });
    uploadStream.end(fileBufferOrUri);
  });
}

/**
 * Deletes an image from Cloudinary by its public ID.
 * @param {string} publicId - The Cloudinary public ID
 */
export async function deleteFromCloudinary(publicId) {
  if (!publicId) return null;
  return await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;

