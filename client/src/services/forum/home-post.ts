import { apiClient } from "../../libs";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types";

export const getHomePosts = () => {
  return apiClient.get<Post[]>("/posts/all");
};

export const useHomePosts = () => {
  return useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const response = await getHomePosts();
      return response.data;
    },
  });
};

export const getPostDetails = (postId: string) => {
  return apiClient.get<Post>(`/posts/${postId}`);
};

export const usePostDetails = (postId: string) => {
  return useQuery({
    queryKey: ["post-details", postId],
    queryFn: () => getPostDetails(postId),
  });
};
