import mongoose from "mongoose";
import sharp from "sharp";

import Post from "../models/post.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { uploadImage, deleteImage } from "../services/cloudinary.service.js";

// converts a 0-255 channel value to a 2-digit hex string
const toHex = (value) => Math.round(value).toString(16).padStart(2, "0");

// gets the average color of an image buffer as a hex string
const getAverageColorHex = async (buffer) => {
    const { channels } = await sharp(buffer).stats();
    // channels[0] = red, channels[1] = green, channels[2] = blue
    const [r, g, b] = channels;
    return `#${toHex(r.mean)}${toHex(g.mean)}${toHex(b.mean)}`;
};

export const createPost = async (req, res) => {
    // Accessing the title from req.body and the image from req.file
    const body = req.body;
    const image = req.file; // must come from bufferUpload (memoryStorage) so image.buffer exists

    if (!body.title || !image) {
        return res.status(400).json({ success: false, message: "Required Fields not provided" });
    }

    try {
        const imageMeta = await sharp(image.buffer).metadata();
        const dominantColor = await getAverageColorHex(image.buffer);

        // Upload the original image to Cloudinary
        const uploadedImage = await uploadImage(image, "posts");

        // Thumbnail is generated as a Cloudinary transformation URL off the same
        // public_id — no second upload, and matches your schema (thumbnail is just a String)
        const thumbnailUrl = cloudinary.url(uploadedImage.publicId, {
            secure: true,
            transformation: [{ width: 720, crop: "limit", fetch_format: "png" }],
        });

        const newPost = new Post({
            ...body,
            slog: body.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^a-z0-9\-]/g, ""), // replace spaces with '-' and only have alpha numeric values
            image: {
                publicId: uploadedImage.publicId,
                src: uploadedImage.src,
            },
            thumbnail: thumbnailUrl,
            height: imageMeta.height,
            width: imageMeta.width,
            color: dominantColor,
        });

        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error("Error creating post. Error: ", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getAllPost = async (req, res) => {
    const { page = 1 } = req.query;
    const { limit = 20 } = req.query;
    const parsedPage = Math.max(1, parseInt(page));
    const parsedLimit = Math.max(1, parseInt(limit));

    try {
        const post = await Post.find({})
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit);
        const total = await Post.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                post: [...post],
                pageData: {
                    total: total,
                    totalFetched: (parsedPage - 1) * parsedLimit + post.length,
                    currentlyFetched: post.length,
                    hasMore: parsedPage * parsedLimit < total,
                    page: parsedPage,
                    totalPage: Math.ceil(total / parsedLimit),
                },
            },
        });
    } catch (error) {
        console.error("Error in fetching post: ", error.message);
        res.status(500).json({ success: false, message: "Error in Server" });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Post not found/Invalid ID" });
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        console.error("Error fetching post by ID:", error.message);
        res.status(500).json({ success: false, message: "Error in Server" });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Post Not Found/ Invalid ID" });
    }

    try {
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post Not Found" });
        }

        if (post.image?.publicId) {
            await deleteImage(post.image.publicId);
        }

        res.status(200).json({ success: true, message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}, "image.publicId");
        await Promise.allSettled(
            posts
                .filter(p => p.image?.publicId)
                .map(p => deleteImage(p.image.publicId))
        );

        await Post.deleteMany();
        res.status(200).json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Couldn't delete" });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Post Not Found/ Invalid ID" });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ success: true, data: updatedPost, message: "Post updated Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};