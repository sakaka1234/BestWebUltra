import { useState } from "react";
import { useSendFriendRequest } from "../../../services";
import { toast } from "react-hot-toast";

interface DiscussionCardProps {
  id: string;
  userImage: string;
  userName: string;
  comment: string;
}

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  id,
  userImage,
  userName,
  comment,
}) => {
  const [isSending, setIsSending] = useState(false);
  const sendFriendRequestMutation = useSendFriendRequest();

  const handleAddFriendClick = async () => {
    try {
      setIsSending(true);
      await sendFriendRequestMutation.mutateAsync(id);
      toast.success(`Friend request sent to ${userName}`);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to send friend request";
      toast.error(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex items-start gap-3 bg-[#232931] rounded-xl p-4 mb-3 shadow-sm">
      <img
        src={userImage}
        alt={userName}
        className="w-10 h-10 rounded-full border-2 border-[#393e46] object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold text-white">{userName}</span>
          <button
            onClick={handleAddFriendClick}
            disabled={isSending}
            className={`text-xs px-3 py-1 rounded-lg transition-colors
              ${
                isSending
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-[#3b82f6] hover:bg-[#2563eb] text-white"
              }`}
          >
            {isSending ? "Sending..." : "Add Friend"}
          </button>
        </div>
        <div className="text-gray-200 text-[15px]">{comment}</div>
      </div>
    </div>
  );
};
