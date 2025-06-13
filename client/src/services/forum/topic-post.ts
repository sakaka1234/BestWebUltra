import { apiClient } from "../../libs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types";
import { toast } from "react-hot-toast";

export const getTopicPosts = (topicId: string) => {
  return apiClient.get<Post[]>(`posts/topic/${topicId}`);
};

export const useTopicPosts = (topicId: string) => {
  return useQuery({
    queryKey: ["topic-posts", topicId],
    queryFn: () => getTopicPosts(topicId),
  });
};
export type Topic = {
  _id: string;
  name: string;
};

export const getTopics = () => {
  return apiClient.get<Topic[]>("posts/topics/all");
};
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: {
      title?: string;
      content: string;
      topicId: string;
      image?: string;
    }) => {
      return apiClient.post<Post>("posts/create", postData);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["topic-posts"] });
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    },
  });
};
