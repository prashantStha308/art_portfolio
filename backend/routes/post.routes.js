import {
    createPost,
    deleteAllPosts,
    deletePost,
    getAllPost,
    getPostById,
    updatePost
} from "../controllers/post.controller.js";
import { bufferUpload } from "../config/multer.config.js";
import express from "express";
const postRouter = express.Router();
// /api/post/....

// create a post
postRouter.post('/', bufferUpload.single('post'), createPost);
// This deletes alllll the posts
postRouter.delete('/deleteall', deleteAllPosts);
// Get all possible posts
// "/api/post?limit=__page=__"
postRouter.get('/', getAllPost);
// Get posts by their ID
postRouter.get('/:id', getPostById);
// Delete post
postRouter.delete('/:id', deletePost);
// Update posts
postRouter.put('/:id', updatePost);
export default postRouter;