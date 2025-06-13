import React from "react";

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
  const handleAddFriendClick = () => {
      //xử lý sau
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
            className="text-xs bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 py-1 rounded-lg transition-colors"
          >
            Add Friend
          </button>
        </div>
        <div className="text-gray-200 text-[15px]">{comment}</div>
      </div>
    </div>
  );
};
