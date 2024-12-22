import mongoose from "mongoose";
import { postScheme } from "./post.model.js";

const projectSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false,
        default: "No Descriptions provided"
    },
    posts:[postScheme],
    tags:{
        type: [String],
        required: false
    },
    thumbnail:{
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Project',projectSchema);
export default Project;