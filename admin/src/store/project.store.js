import { create } from "zustand";
import axios from "axios";

const ProjectStore = create( (set) => ({
    projects: [],
    setProject: (project) => set({ project }),

    createProject: async( newProject ) =>{
        try {
            if( !newProject.title ){
                throw new Error("Required Fields not filled");
            }
            const res = await axios.post( "/api/project/create" , newProject );
            if( res.status != 201 ){
                throw new Error(`Failed createing project with status: ${res.status}`);
            }

            set( (state) => ({ projects: [...state.projects , newProject] }) );

            return { success: true , message: "Created Project Successfully" };
        } catch (error) {
            return { success: false , message: error.response?.message || error.message || "Unexpected error occured" };
        }
    },

    getAllProject: async() => {
        try {
            const res = await axios.get("/api/project");
            if( res.status != 200 ){
                throw new Error(`Failed to fetch projects with status ${res.status}`);
            }
            const data = res.data;
            set( state => ({ projects: [...state.projects , ...data.data.filter( dataPost => !state.projects.some( item => item._id === dataPost._id ) ) ] }) );

            return { success: true , data: data.data };
        } catch (error) {
            return { success: false , message: error.response?.message || error.message || "Unexpected error occured" };
        }
    }

}) );

const useProjectStore = ()=> ProjectStore();

export default useProjectStore;