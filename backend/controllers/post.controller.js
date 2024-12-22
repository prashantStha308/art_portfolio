import Post from "../models/post.model.js";
import mongoose from "mongoose";

export const createPost = async ( req , res ) => {
    const post = req.body;

    // If required fields are not present, the operation can't be further proceeded
    if( !post.title || !post.imageUrl ){
        res.status(400).json( { success: false , message: "Required Fields not provided" } );
    }

    const newPost = new Post(post);
    try {
        // save the newPost
        newPost.save();
        res.status(201).json( {success: true , data: newPost} );
    } catch (error) {
        console.log('Error creating post. Error: ',error.message);
        res.status(500).json({success: false , message: 'Server Error'})
    }
}

export const getAllPost = async ( req , res ) => {
    try {
        const post = await Post.find({});
        res.status(200).json({success:true , data: post});
    } catch (error) {
        console.log("Error in fetching post: ",error.message);
        res.status(500).json({success:true , message:"Error in Server"});
    }
}

export const getPostById = async ( req , res )=>{
    const { id } = req.params;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        res.status(404).json({ success: false , message: 'Post not found/Invalid ID' });
    }

    try {
        const post = await Post.findById(id);
        res.status(200).json({ success: true , data: post });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:true , message:"Error in Server"});
    }
}

export const deletePost = async (req,res)=>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Post Not Found/ Invalid ID"})
    }

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Post deleted"});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const updatePost  = async ( req , res ) => {
    const {id} = req.params;
    const updates = req.body;

    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({success:false, message:"Post Not Found/ Invalid ID"})
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id , updates , {new: true});
        // { new: true } is an option in findByIdAndUpdate that makes it so that it returns a new object instead of original one
        res.status(200).json({ success: true , data: updatedPost });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}