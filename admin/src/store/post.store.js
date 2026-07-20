import { create } from "zustand";
import axios from "axios";

const PostStore = create( (set) =>({
    posts:[],
    setPosts: post => (set({post})),

    createPost: async ( newPost ) => {
        // newPost is a formData object
        if( !newPost.get('title') || !newPost.get('post') ){
            return { success: false , message: " Required Fields not filled " };
        }
        try {
            const res = await axios.post( "/api/post" , newPost );
            if( res.status !== 201 ){
                throw new Error(`Error occured while fetching with status code: ${res.status}`);
            }
            const data = res.data;
            set((state) => ({ posts: [...state.posts, data.data] }));

            return { success: true, message: "Post Created Successfully" };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message || "Something went wrong" };
        }
    },

    getAllPost: async ()=>{

        try {
            const res = await axios.get( "/api/post?limit=240" );
            if( res.status !== 200 ){
                throw new Error( "Error fetching posts" );
            }
            const data = res.data;

            set((state) => ({
                posts: [
                    ...state.posts,
                    ...data.data.post.filter((newPost) => !state.posts.some((oldPost) => oldPost._id === newPost._id)),
                ],
            }));
            set({ pageData: {...data.data.pageData} });

            return {  success: true , data: data.data , message: "Fetched Successfully" };
        } catch (error) {
            return { success: false , data: null , message: error.response?.data?.message || error.message || "Something went wrong" };
        }
    },

    getPostById: async (id) => {
        try {
            const res = await axios.get(`/api/post/${id}`); // Ensure base URL is correctly set
    
            const data = res.data?.data; // Extract `data` safely
    
            set((state) => ({
                posts: state.posts.some((post) => post._id === data._id)
                    ? state.posts.map((post) => (post._id === data._id ? data : post))
                    : [...state.posts, data], 
            }));
    
            return { success: true, data, message: "Fetched Successfully" };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || error.message || "Something went wrong",
            };
        }
    },


    updatePost: async ( id , newData ) => {
        try {
            
            const res = await axios.put( `/api/post/${id}` , newData );
            if( res.status !== 200 ){
                throw new Error( "Failed to Update the post" );
            }

            // Remove the previous post and insert the updated post
            set((state) => ({
                posts: state.posts.map((post) =>
                    post._id === id ? { ...post, ...newData } : post
                )
            }));

            return{ success: true , data: newData , message: "Post Updated successfully" };
        } catch (error) {
            return { success: false , data: null , message: error.response?.data?.message || error.message || "Something went wrong" };
            
        }
    },

    deletePost: async (id) => {
        try {
            const res = await axios.delete(`/api/post/${id}`);
            if (res.status !== 200) {
                throw new Error("Failed to delete the Post");
            }
    
            set((state) => ({
                posts: state.posts.filter((item) => item._id !== id)
            }));
    
            return { success: true, message: "Successfully Deleted the Post" };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message || "Something went wrong" };
        }
    },

}) )

export const usePostStore = ()=> PostStore();