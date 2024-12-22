import mongoose from "mongoose";

export const postScheme = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false,
        default: "No Descriptions provided"
    },
    imageUrl:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post',postScheme);
export default Post;