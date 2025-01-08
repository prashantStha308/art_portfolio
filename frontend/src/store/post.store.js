import { create } from 'zustand';

export const PostStore = create( ( set ) =>({

    post: [],
    setPost : (post) => ( set({post}) ),

    // createPost in backend expects an object in body of req. The body MUST have title and image
    createPost: async ( newPost ) => {
        // newPost is a formData object
        if( !newPost.get('title') ){
            return { success: false , message: " Required Fields not filled " };
        }
        console.log( "FOrmDFAta:",newPost )

        try {
            const res = await fetch( "api/post/create" , {
                method: "POST",
                body: newPost
            } );
            if( !res.ok ){
                console.log('Failed creation');
                return { success: false , message: `Post creation failed. Code: ${res.status}` };
            }

            const data = await res.json(); 
            set((state) => ({ post: [...state.post, data] }));
    
            console.log("Post Created Successfully");
            return { success: true, message: "Post Created Successfully" };

        } catch (error) {
            console.error( error.message );
        }
    },

    getAllPosts : async () =>{
        try {
            const res = await fetch( '/api/post');

            if(!res.ok){
                return { success: false , data: null , message: "Couldn't retrive datas" }
            }
            const data = await res.json();
            set({ post : data.data });
            return {  success: true , data: data.data , message: "Fetched Successfully" };

        } catch (error) {
            console.error(error.message);
            return {  success: false , data: null , message: error.message };
        }
    }

}) )