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
    project:{
        type: mongoose.Types.ObjectId,
        ref: "Project",
        default: null
    },
    image:{
        publicId:{
            type: String,
            required: true
        },
        src:{
            type: String,
            required: true            
        }
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
    tags: [String],
    timeCreated:{
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('Post',postScheme)

export default Post;
