import { create } from 'zustand';

export const ProjectStore = create( (set) =>({
    project: [],
    setProject: (project) => ( set({project}) ),

    createProject: async (newProject) =>{
        console.log("Inside PROJECT Creation function");
        if( !newProject.title ){
            return { success: false , message: "Required fields not present" };
        }

        try {
            const res = await fetch( "/api/project/create", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", // Set the correct content type
                },
                body: JSON.stringify(newProject),
            } )
            if( !res.ok ){
                console.log("Project Creatation FAILED");
                throw new Error(`Error creating project with code: ${res.status}`);
            }
            const data = await res.json(); 
            set((state) => ({ project: [...state.project, data.data] }));
            return { success: true, message: "Project Created Successfully" };

        } catch (error) {
            console.log(error.message)
            return {success:false , message: error.message};
        }
    },

    getAllProjects: async () =>{
        console.log("INside Get all Project funciton")

        try {
            const res = await fetch( '/api/project/' );
            if(!res.ok){
                throw new Error(`Failed to fetch project with status: ${res.status}`);
            }
            const data = await res.json();
            set({ project: [...data.data] });

            return { success: true , data: data.data , message: "Successfully fetched Projects" }
        } catch (error) {
            console.error("Error fetching projects: ", error);
            return { success: false , message: error.message };
        }

    },

    getProductById: (id) => {

    },

}) )