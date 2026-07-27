import axios from "axios";
import ROUTES from "./routes";


export const getReadMe = async()=>{
	const res = await axios.get(ROUTES.PROXY.README());

	return res.data;
}


export const getRepos = async()=>{
	const res = await axios.get(ROUTES.PROXY.REPOS());

	return res.data;
}

export const getPinnedRepos = async()=>{
	const res = await fetch("https://pinned.berrysauce.dev/get/prashantStha308");

	if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

	return await res.json();
}