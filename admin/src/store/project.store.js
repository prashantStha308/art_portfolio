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
            const data = res.data;
            if( !data.success ){
                throw new Error( data?.message || "Unexpected Error Occurred" );
            }
            set( (state) => ({ projects: [...state.projects , data.data] }) );

            return { success: true , data: data.data , message: "Created Project Successfully" };
        } catch (error) {
            return { success: false , message: error.response?.data?.message || error.message || "Unexpected error occured" };
        }
    },

    getAllProject: async() => {
        try {
            const res = await axios.get("/api/project");
            const data = res.data;
            if( !data.success ){
                throw new Error( data?.message || "Unexpected Error Occurred" );
            }
            // only store unique datas, avoid duplication
            set( state => ({ projects: [...state.projects , ...data.data.filter( dataProject => !state.projects.some( item => item._id === dataProject._id ) ) ] }) );

            return { success: true , data: data.data };
        } catch (error) {
            return { success: false , message: error.response?.data?.message || error.message || "Unexpected error occured" };
        }
    },

    getProjectById: async (id) => {
        try {
            const res = await axios.get(`/api/project/${id}`);
            const data = res.data;
            if( !data.success ){
                throw new Error( data?.message || "Unexpected Error Occurred" )
            }
        //   only store if data is not already in projects array
          set( (state) => ({ projects: state.projects.some( item => item._id === data._id ) ? state.projects : [ ...state.projects , data ] }) );

          return { success: true , data: data.data }
        } catch (error) {
          return { success: false, message: error.response?.data?.message || error.message || "Unexpected error occurred" };
        }
      },

      updateProject: async( id , body ) => {
        try {
            if( !body.title ){
                throw new Error("Required Fields not filled");
            }
            const res = await axios.put(`/api/project/edit/${id}` , body);
            const data = res.data;
            if( !data.success ){
                throw new Error( data?.message || "Unexpected Error Occurred" );
            }
            // replace the old data with new data
            set( state=> ({ projects: state.projects.map( item => item._id === id ? data : item )}) );
            return { success: true , message: "Project Updated Successfully!!" };
        } catch (error) {
          return { success: false, message: error.response?.data?.message || error.message || "Unexpected error occurred" };
        }
      },

      deleteProject: async(id) => {
        try {
            const res = await axios.delete(`/api/project/delete/${id}`);
            const data = res.data;
            if( !data.success ){
                throw new Error( data?.message || "Unexpected Error Occurred" );
            }
            set( state => ({ projects: state.projects.filter( item => item._id !== id ) }) );
            return { success: true , message: "Project Deleted Successfully!!" };
        } catch (error) {
          return { success: false, message: error.response?.data?.message || error.message || "Unexpected error occurred" };
        }
      }

}) );

const useProjectStore = ()=> ProjectStore();

export default useProjectStore;