import { apiClient } from "../../libs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Comment } from "../../types";

// Get comments
export const getDiscussionComments = (postId: string) => {
  return apiClient.get<Comment[]>(`/posts/${postId}/comments`);
};

export const useDiscussionComments = (postId: string) => {
  return useQuery({
    queryKey: ["post-comments", postId],
    queryFn: async () => {
      const response = await getDiscussionComments(postId);
      return response.data;
    },
    enabled: !!postId,
  });
};

// Add comment
export const addComment = (postId: string, content: string) => {
  return apiClient.post<Comment>(`/posts/${postId}/comment`, { content });
};

export const useAddComment = (postId: string) => {
  return useMutation({
    mutationKey: ["add-discussion-comment", postId],
    mutationFn: (content: string) => addComment(postId, content),
  });
};
