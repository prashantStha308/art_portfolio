import { create } from 'zustand';

export const PostStore = create( ( set ) =>({

    post: [],
    pageData: { total: 0 , currentlyFetched : 0 , hasMore: true , page: 1 , totalPage : 1 },
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
            set((state) => ({ post: [...state.post, data.data] }));
    
            console.log("Post Created Successfully");
            return { success: true, message: "Post Created Successfully" };

        } catch (error) {
            console.error( error.message );
        }
    },

    getAllPosts : async ( page = 1 , limit = 20 ) =>{
        try {
            const res = await fetch( `/api/post?page=${page}&limit=${limit}`);
            if(!res.ok){
                return { success: false , data: null , message: "Couldn't retrive datas" }
            }
            const data = await res.json();
            // set posts in a way that each items are unique
            set((state) => ({
                post: [
                    ...state.post,
                    ...data.data.post.filter((newPost) => !state.post.some((oldPost) => oldPost._id === newPost._id)),
                ],
            }));
            // set pageData
            set({ pageData: {...data.data.pageData} });

            return {  success: true , data: data.data , message: "Fetched Successfully" };

        } catch (error) {
            console.error(error.message);
            return {  success: false , data: null , message: error.message };
        }
    },

    getPostById: async (pid) => {
        console.log("Getting post with ID:", pid);
        try {
            const res = await fetch(`/api/post/${pid}`);
            const data = await res.json();
            console.log( "Data:",data );
            if( !data.success ){
                throw new Error(data);
            }
            return { success: true, data: data.data };
        } catch (error) {
            console.log(error.message);
        }
    },

    deletePost: async(pid)=>{
        const res = await fetch( `/api/post/delete/${pid}` , {
            method: "DELETE"
        } );
        const data = await res.json();
        if( !data.success )
            return{ success: false , message: data.message };
        
        // updates UI immediately without needing to refresh
        set( state=>({
            post: state.post.filter( (item)=> item._id !== pid )
        }) );

        return{ success: true , message: data.message };
    },

    updatePost: async ( pid , newBody ) => {
        const res = await fetch( `/api/post/edit/${pid}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBody) // Send updated product data here
        } );
        const data = await res.json();
        if( !data.success ){
            return{ success: false , message: data.message };
        }

        set(state=>({
            post: state.post.map( item => (item._id === pid ? data.data : item) )
        }))

        return{ success: true , message: data.message };
    }

}) )