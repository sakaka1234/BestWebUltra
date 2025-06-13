import { useState } from "react";
import {
  useAcceptFriendInvitation,
  useRejectFriendInvitation,
} from "../../../services";

interface FriendCardProps {
  userImage: string;
  userName: string;
  id: string;
}

export const FriendCardInvite: React.FC<FriendCardProps> = ({
  userImage,
  userName,
  id,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const acceptMutation = useAcceptFriendInvitation();
  const rejectMutation = useRejectFriendInvitation();

  const handleAccept = async () => {
    try {
      setIsProcessing(true);
      await acceptMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsProcessing(true);
      await rejectMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to reject friend request:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#232931] rounded-xl p-5 flex items-center gap-4 shadow-md w-[300px]">
      <img
        src={userImage}
        alt={userName}
        className="w-14 h-14 rounded-full border-2 border-[#393e46] object-cover"
      />
      <div className="flex-1">
        <div className="text-lg font-semibold text-white">{userName}</div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAccept}
            disabled={isProcessing || acceptMutation.isPending}
            className={`px-4 py-1 ${
              isProcessing || acceptMutation.isPending
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600"
            } text-white rounded-lg font-medium transition-colors duration-150`}
          >
            {acceptMutation.isPending ? "Accepting..." : "Accept"}
          </button>
          <button
            onClick={handleReject}
            disabled={isProcessing || rejectMutation.isPending}
            className={`px-4 py-1 ${
              isProcessing || rejectMutation.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20"
            } text-gray-200 border border-gray-400/30 rounded-lg font-medium transition-colors duration-150`}
          >
            {rejectMutation.isPending ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const FriendCard = ({
  userImage,
  userName,
}: {
  userImage: string;
  userName: string;
}) => {
  return (
    <div className="bg-[#232931] rounded-xl p-5 flex items-center gap-4 shadow-md w-[300px]">
      <img
        src={userImage}
        alt={userName}
        className="w-14 h-14 rounded-full border-2 border-[#393e46] object-cover"
      />
      <span className="text-lg font-semibold text-white">{userName}</span>
    </div>
  );
};
