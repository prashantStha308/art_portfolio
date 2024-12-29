import Project from "../models/project.model.js";
import mongoose from "mongoose";

export const getAllProjects = async ( req , res ) => {
    try {
        const projects = Project.find({});
        res.status(200).json({ success: true , data: projects });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:true , message:"Error in Server"});
    }
}

export const getProjectById = async ( req , res ) => {
    const {id} = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ){
        res.status(404).json({ success: false , message: 'Project not found' });
    }

    try {
        const targetProject = await Project.findById(id);
        res.status(200).json({ success: true , data: targetProject });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:true , message:"Error in Server"});
    }
}

export const createProject = async ( req , res ) => {
    const body = req.body;
    if( !body.title ){
        res.status(400).json({ success: false , message: "Required Fields not provided" });
    }
    const newProject = new Project(body);
    try {
        newProject.save();
        res.status(201).json( {success: true , data: newProject} );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:true , message:"Error in Server"});
    }
}

export const deleteProject = async ( req , res ) => {
    const {id} = req.params;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        res.status(404).json({ success: false , message: 'Project not found' });
    }

    try {
        await Project.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Project deleted"});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const updateProject = async ( req , res ) =>{
    const {id} = req.params;
    const body = req.body;

    if( !mongoose.Types.ObjectId.isValid(id) ){
        res.status(404).json({ success: false , message: 'Project not found' });
    }

    try {
        const updatedProject = await Project.findByIdAndUpdate(id , body , {new: true});
        res.status(200).json({ success: true , data: updatedProject });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}