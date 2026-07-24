import axios from "axios";
import ROUTES from "./routes";

export const getAllProjects = async(query)=>{
	const res = await axios.get(ROUTES.PROJECT.GET_ALL(query));

	return res.data.data;
}


export const getProjectById = async(id)=>{
	const res = await axios.get(ROUTES.PROJECT.GET_BY_ID(id));

	return res.data.data;
}


export const createProject = async(body)=>{
	const res = await axios.post(ROUTES.PROJECT.CREATE(), body);

	return res.data.data;
}


export const updateProject = async(id, body)=>{
	const res = await axios.put(ROUTES.PROJECT.UPDATE(id),body);

	return res.data.data;
}


export const deleteProject = async(id)=>{
	const res = await axios.delete(ROUTES.PROJECT.DELETE(id));

	return res.data.data;
}