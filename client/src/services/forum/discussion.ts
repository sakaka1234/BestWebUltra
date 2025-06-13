import { apiClient } from "../../libs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Comment, CommentReply } from "../../types";

export const getDiscussionComments = (discussionId: string) => {
    return apiClient.get<Comment[]>(`/discussion/${discussionId}`);
};

export const useDiscussionComments = (discussionId: string) => {
    return useQuery({
        queryKey: ["discussion-comments", discussionId],
        queryFn: () => getDiscussionComments(discussionId),
    });
};

export const addDiscussionComment = (discussionId: string, content: CommentReply) => {
    return apiClient.post(`/discussion/${discussionId}`, { content });
};

export const useAddDiscussionComment = (discussionId: string) => {
    return useMutation({
        mutationKey: ["add-discussion-comment", discussionId],
        mutationFn: (content: CommentReply) => addDiscussionComment(discussionId, content),
    });
};
