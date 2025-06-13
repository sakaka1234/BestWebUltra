import { apiClient } from "../../libs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FriendRequest } from "../../types";
import toast from "react-hot-toast";

export const getFriendInvitations = () => {
  return apiClient.get<FriendRequest[]>("/friends/requests/reiceived");
};

export const useFriendInvitations = () => {
  return useQuery({
    queryKey: ["friend-invitations"],
    queryFn: getFriendInvitations,
  });
};

export const acceptFriendInvitation = (id: string) => {
  return apiClient.post(`/friends/accept/${id}`);
};

export const useAcceptFriendInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptFriendInvitation,
    onSuccess: () => {
      // Invalidate and refetch friend lists
      queryClient.invalidateQueries({ queryKey: ["friend-invitations"] });
      queryClient.invalidateQueries({ queryKey: ["friends-list"] });
      toast.success("Friend request accepted");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to accept friend request"
      );
    },
  });
};

export const rejectFriendInvitation = (id: string) => {
  return apiClient.post(`/friends/reject/${id}`);
};

export const useRejectFriendInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectFriendInvitation,
    onSuccess: () => {
      // Only need to invalidate invitations since we're rejecting
      queryClient.invalidateQueries({ queryKey: ["friend-invitations"] });
      toast.success("Friend request rejected");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to reject friend request"
      );
    },
  });
};
export const sendFriendRequest = (friendId: string) => {
  return apiClient.post(`/friends/send/${friendId}`);
};

export const useSendFriendRequest = () => {
  return useMutation({
    mutationKey: ["send-friend-request"],
    mutationFn: sendFriendRequest,
  });
};
