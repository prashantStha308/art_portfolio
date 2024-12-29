import mongoose from "mongoose";

export const postScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    imgUrl:{
        type: String,
        required: false
    },
    tags: [String],
    timeCreated:{
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('Post',postScheme)

export default Post;
