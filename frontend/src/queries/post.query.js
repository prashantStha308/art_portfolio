import { 
    useQueryClient,
    useQuery,
    useInfiniteQuery,
    useMutation
} from "@tanstack/react-query";

import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from "../api/post.api.js";


const postQueryKey = "post";

export const useGetAllPosts = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ['posts', limit],
    queryFn: ({ pageParam = 1 }) => getAllPosts({ page: pageParam, limit }),
    
    getNextPageParam: (lastPage) => {
      const { hasMore, page } = lastPage.pageData;
      return hasMore ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
export const useGetPostById = (id) => {
    return useQuery({
        queryFn: () => getPostById(id),
        queryKey: [postQueryKey, id],
        enabled: !!id
    })
}


export const useCreatePost = (body)=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => createPost(body),
        mutationKey: ["postCreating"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [postQueryKey] })
        }
    })
}

export const useUpdatePost = (id, body) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updatePost(id, body),
        mutationKey: ["postUpdating"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [postQueryKey, id], exact: true })
        }
    })
}

export const useDeletePost = (id)=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ()=> deletePost(id),
        mutationKey: ["postDeleting"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [postQueryKey, id], exact: true })
        }
    })
}