import e from "express";
import { getAllProjects , getProjectById , createProject, deleteProject, updateProject, deleteAllProjects } from "../controllers/project.controller.js";

const projectRouter = e.Router();
// /api/project/...

  
// Delete all projects
projectRouter.delete('/deleteall',deleteAllProjects);
// Get all Projects
projectRouter.get('/',getAllProjects);

// Dynamic links:
// Get Project by ID
projectRouter.get('/:id',getProjectById);
// Create a Project
projectRouter.post('/create',createProject);
// Delete a Project
projectRouter.delete('/delete/:id',deleteProject);
// Update a Project
projectRouter.put('/edit/:id',updateProject);


export default projectRouter;