import mongoose, { mongo } from "mongoose";

export const postScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    slog:{
        type: String,
        required: false
    },
    imgUrl:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: false
    },
    width:{
        type: Number,
        required: true,
    },
    height:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        default: "#ffffff",
    },
    project:[{
        type: String,
        required: false
    }],
    tags: [String],
    timeCreated:{
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('Post',postScheme)

export default Post;
