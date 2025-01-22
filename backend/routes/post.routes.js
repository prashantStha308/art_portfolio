import { createPost, deleteAllPosts, deletePost, getAllPost, getPostById, updatePost } from "../controllers/post.controller.js";
import { thumbStorage, upload } from "../picture.js";
import express from "express";

const postRouter = express.Router();
// /api/post/....


// Don't add thumbnail.single() aaile, we need to correctly change base64 to file
// create a post
postRouter.post('/create',upload.single('post'),createPost);

// This deletes alllll the posts
postRouter.delete('/deleteall',deleteAllPosts);

// Get all possible posts
postRouter.get('/',getAllPost);
// Get posts by their ID
postRouter.get('/:id',getPostById);
// Delete post
postRouter.delete('/delete/:id',deletePost);
// Update posts
postRouter.put('/edit/:id',updatePost);

export default postRouter;