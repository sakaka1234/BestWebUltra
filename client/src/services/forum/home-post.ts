import { apiClient } from "../../libs";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types";

export const getHomePosts = () => {
    return apiClient.get<Post[]>("/all")
}

export const useHomePosts = () => {
    return useQuery({
        queryKey: ["home-posts"],
        queryFn: getHomePosts,
    });
}

export const getPostDetails = (postId: string) => {
    return apiClient.get<Post>(`/post/${postId}`);
}

export const usePostDetails = (postId: string) => {
    return useQuery({
        queryKey: ["post-details", postId],
        queryFn: () => getPostDetails(postId),
    });
};