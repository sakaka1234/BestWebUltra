import { apiClient } from "../../libs";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types";

export const getTopicPosts = (topicId: string) => {
    return apiClient.get<Post[]>(`/topic/${topicId}`);
}

export const useTopicPosts = (topicId: string) => {
    return useQuery({
        queryKey: ["topic-posts", topicId],
        queryFn: () => getTopicPosts(topicId),
    });
};


