import { 
    useQuery,
} from "@tanstack/react-query";
import {
    getReadMe,
    getRepos,
    getPinnedRepos,
} from "../api/proxy.api.js";


export const useGetReadMe = () => {
    return useQuery({
        queryKey: ["readMe"],
        queryFn: getReadMe,
        staleTime: 3 * 60 * 60 * 1000,
    });
};


export const useGetRepos = () => {
    return useQuery({
        queryKey: ["repos"],
        queryFn: getRepos,
        staleTime: 3 * 60 * 60 * 1000,
    });
};


export const useGetPinnedRepos = () => {
    return useQuery({
        queryKey: ["pinnedRepos"],
        queryFn: getPinnedRepos,
        staleTime: 3 * 60 * 60 * 1000,
    });
};