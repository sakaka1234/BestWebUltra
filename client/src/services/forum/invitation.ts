import { apiClient } from "../../libs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FriendRequest } from "../../types";

export const getFriendInvitations = () => {
  return apiClient.get<FriendRequest[]>("/request/reiceived");
};

export const useFriendInvitations = () => {
  return useQuery({
    queryKey: ["friend-invitations"],
    queryFn: getFriendInvitations,
  });
};

export const acceptFriendInvitation = (id: string) => {
  return apiClient.post(`/accept/${id}`);
};

export const useAcceptFriendInvitation = () => {
  return useMutation({
    mutationKey: ["accept-friend-invitation"],
    mutationFn: acceptFriendInvitation,
  });
};

export const rejectFriendInvitation = (id: string) => {
  return apiClient.post(`/reject/${id}`);
};

export const useRejectFriendInvitation = () => {
  return useMutation({
    mutationKey: ["reject-friend-invitation"],
    mutationFn: rejectFriendInvitation,
  });
};
