import { create } from 'zustand';

export const ProjectStore = create( (set) =>({
    project: [],
    setProject: (project) => ( set({project}) ),

    createProject: async (newProject) =>{
        if( !newProject.title ){
            return { success: false , message: "Required fields not present" };
        }

        try {
            const res = await fetch( "/api/project/create", {
                method: 'POST',
                body: newProject
            } )
            if( !res.ok ){
                console.log("Project Creatation FAILED");
                throw new Error(res.message)
            }
            const data = await res.json(); 
            set((state) => ({ project: [...state.project, data] }));
    
            console.log("Project Created Successfully");
            return { success: true, message: "Project Created Successfully" };

        } catch (error) {
            console.log(error.message)
        }
    },

    getAllProjects: () =>{

    },

    getProductById: (id) => {

    },

}) )