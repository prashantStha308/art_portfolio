import axios from "axios";
import ROUTES from "./routes";

export const getAllPosts = async(query)=>{
	const res = await axios.get(ROUTES.POST.GET_ALL(query));

	return res.data.data;
}


export const getPostById = async(id)=>{
	const res = await axios.get(ROUTES.POST.GET_BY_ID(id));

	return res.data.data;
}


export const createPost = async(body)=>{
	const res = await axios.post(ROUTES.POST.CREATE(), body);

	return res.data.data;
}


export const updatePost = async(id, body)=>{
	const res = await axios.put(ROUTES.POST.UPDATE(id), body);

	return res.data.data;
}


export const deletePost = async(id)=>{
	const res = await axios.get(ROUTES.POST.DELETE(id));

	return res.data.data;
}