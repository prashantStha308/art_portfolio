import { Readable } from "stream";
import cloudinary from "../config/cloudinary.config.js";
import path from "node:path";

// helpers
export const validateFileExt = (file) => {
    const allowedExtensions = [
        // images
        ".png", ".jpeg", ".jpg", ".webp",
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        throw new Error("Invalid files type");
    }
};

/**
 * @description Uploads a file buffer to Cloudinary.
 *
 * @param {Buffer} fileBuffer - The file buffer to upload from Multer.
 * @param {Object} options - Upload options.
 * @param {string} [options.folder="profilePicture"] - The Cloudinary folder where the file will be stored.
 * @param {('image'|'video'|'raw'|'auto')} [options.resourceType='auto'] - The type of resource being uploaded.
 * @returns {Promise<{src: string, public_id: string }>} Resolves with Cloudinary response object containing src and public ID.
 * @throws {Error} Throws an error if upload fails.
 */
export const uploadToCloudinary = (file, { folder = "profilePicture", resourceType = 'auto' }) => {
    return new Promise((resolve, reject) => {
        validateFileExt(file);
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                type: 'upload',
                resource_type: resourceType,
                timeout: 300000, // bumped from 120000 — 5 min instead of 2
            },
            (error, res) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                resolve(res);
            }
        );
        uploadStream.end(file.buffer);
    });
};

/**
 * Deletes a file from Cloudinary.
 *
 * @param {string} publicId - Public ID of the resource in Cloudinary.
 * @param {string} resourceType - Resource type used during upload.
 * @returns {Promise<boolean>} True if deletion succeeded, else false.
 */
export const deleteFromCloudinary = async (publicId, resourceType) => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};



const returnRes = async (promise) => {
    const res = await promise;
    return { publicId: res.public_id, src: res.secure_url };
};

export const uploadImage = async (image, folder = "image") => {
    return await returnRes(uploadToCloudinary(image, { folder, resourceType: "image" }));
};

export const uploadImages = async (images, folder = "image") => {
    const response = await Promise.allSettled(images.map(image => uploadImage(image, folder)));
    return response
        .filter(res => res.status == "fulfilled")
        .map(res => res.value);
};

export const deleteImage = async (publicId) => await deleteFromCloudinary(publicId, "image");