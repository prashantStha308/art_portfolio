import { createPost, deleteAllPosts, deletePost, getAllPost, getPostById, updatePost } from "../controllers/post.controller.js";
import { upload } from "../picture.js";
import express from "express";

const postRouter = express.Router();

// create a post
postRouter.post('/create',upload.single('post'),createPost);
// Get all possible posts
postRouter.get('/',getAllPost);
// Get posts by their ID
postRouter.get('/:id',getPostById);
// Delete post
postRouter.delete('/delete/:id',deletePost);
// Update posts
postRouter.patch('/edit/:id',updatePost);

// This deletes alllll the datas
// postRouter.delete('/deleteall',deleteAllPosts);

export default postRouter;