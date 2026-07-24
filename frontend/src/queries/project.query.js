import { 
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query";

import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from "../api/project.api.js";

const projectQueryKey = "project";

export const useGetAllProjects = ({ page= 1, limit= 20} = {}) => {
    return useQuery({
        queryFn: () => getAllProjects({page,limit}),
        queryKey:[projectQueryKey, {page,limit}]
    })
}

export const useGetProjectById = (id) => {
    return useQuery({
        queryFn: () => getProjectById(id),
        queryKey: [projectQueryKey, id],
        enabled: !!id
    })
}


export const useCreateProject = (body)=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => createProject(body),
        mutationKey: ["projectCreating"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [projectQueryKey] })
        }
    })
}

export const useUpdateProject = (id, body) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateProject(id, body),
        mutationKey: ["projectUpdating"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [projectQueryKey, id], exact: true })
        }
    })
}

export const useDeleteProject = (id)=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ()=> deleteProject(id),
        mutationKey: ["projectDeleting"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [projectQueryKey, id], exact: true })
        }
    })
}