import Post from "../models/post.model.js";
import mongoose from "mongoose";
import fs from 'fs';
import sharp from "sharp";
import path from "path";


export const createPost = async (req, res) => {
    
    // Accessing the title from req.body and the image from req.file
    const body = req.body; 
    const image = req.file;

    console.log("body:",body);
    console.log( "file: ", image );

    // If required fields are not present, the operation can't proceed
    if (!body.title || !image) {
        return res.status(400).json({ success: false, message: "Required Fields not provided" });
    }

    try {
        // Get the path of the file that is uploaded.
        const uploadedFilePath = image.path;

        // get the output dir of the thumbnail. Create one if not available
        const outputDir = path.join('backend' , 'storage' , 'thumbnails');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        // Add the processed file to the thumbnail directory
        const thumbnailDirPath = path.join(outputDir, `thumb-${Date.now()}.png`);
    
        // create a new post
        const newPost = new Post({
            ...body,
            slog: body.title.toLowerCase().replace(/ /g,"-").replace(/[^a-z0-9\-]/g), // replace spaces with '-' and only have alpha neumeric vales
            imgUrl: uploadedFilePath.replace(/^backend/,""),
            thumbnail: thumbnailDirPath.replace(/^backend/,""),
        });

        await sharp(uploadedFilePath).resize(720).toFormat('png').toFile(thumbnailDirPath);

        // Save the newPost
        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error('Error creating post. Error: ', error.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getAllPost = async ( req , res ) => {
    const { page = 1} = req.query;
    const { limit = 20 } = req.query;
    const parsedPage = Math.max(1, parseInt(page)); 
    const parsedLimit = Math.max(1, parseInt(limit));

    try {
        const post = await Post.find({})
        .skip(( parsedPage - 1 ) * parsedLimit) //skip fetching previously fetched datas
        .limit(parsedLimit); //limit items to be fetched
        const total = await Post.countDocuments(); //count the total number of items in database

        res.status(200).json({success:true ,
            data: {
                post: [...post],
                pageData: {
                    total: total,
                    currentlyFetched: post.length,
                    hasMore: (parsedPage * parsedLimit) < total,
                    page: parsedPage,
                    totalPage: Math.ceil( total / parsedLimit )
                }
            },
        });
    } catch (error) {
        console.error("Error in fetching post: ",error.message);
        res.status(500).json({success:true , message:"Error in Server"});
    }
}

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


export const deletePost = async (req,res)=>{
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Post Not Found/ Invalid ID"})
    }

    try {
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post Not Found" });
        }

        // delete image file
        if (post.imgUrl){
            const imagePath = "/backend/" + post.imgUrl; 
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                } else {
                    console.log("Image deleted successfully.");
                }
            });
        }
        
        // delete thumbnail file
        if(post.thumbnail){
            const thumbPath = "/backend/" + post.thumbnail;
            fs.unlink( thumbPath , (err) => {
                if(err){
                    console.error('Error deleting thumbnail',err)
                }else{
                    console.log("Thumbnail deleted successfuly");
                }
            } )
        }

        res.status(200).json({success:true, message: "Post deleted"});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const deleteAllPosts = async ( req , res ) =>{
    try {
        await Post.deleteMany();
        res.status(200).json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false , message: "Couldn't delete"})
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
        res.status(200).json({ success: true , data: updatedPost , message: "Post updated Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}