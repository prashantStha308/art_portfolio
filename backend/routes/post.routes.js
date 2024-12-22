import { createPost, deletePost, getAllPost, getPostById, updatePost } from "../controllers/post.controller.js";
import express from "express";

const postRouter = express.Router();

// create a post
postRouter.post('/create',createPost);
// Get all possible posts
postRouter.get('/',getAllPost);
// Get posts by their ID
postRouter.get('/:id',getPostById);
// Delete post
postRouter.delete('/delete/:id',deletePost);
// Update posts
postRouter.patch('/edit/:id',updatePost);

export default postRouter;