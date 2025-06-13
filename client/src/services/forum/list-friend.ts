import { apiClient } from "../../libs";
import { useQuery } from "@tanstack/react-query";
import { Friend } from "../../types";

export const getFriendsList = () => {
  return apiClient.get<Friend[]>("/list");
};
export const useFriendsList = () => {
  return useQuery({
    queryKey: ["friends-list"],
    queryFn: getFriendsList,
  });
};

