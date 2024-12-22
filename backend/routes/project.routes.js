import e from "express";
import { getAllProjects , getProjectById , createProject, deleteProject, updateProject } from "../controllers/project.controller.js";

const projectRouter = e.Router();

// Get all Projects
projectRouter.get('/',getAllProjects);
// Get Project by ID
projectRouter.get('/:id',getProjectById);
// Create a Project
projectRouter.post('/create',createProject);
// Delete a Project
projectRouter.delete('/delete/:id',deleteProject);
// Update a Project
projectRouter.patch('/edit/:id',updateProject);

export default projectRouter;