import React from "react";

interface DiscussionCardProps {
  userImage: string;
  userName: string;
  comment: string;
}

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  userImage,
  userName,
  comment,
}) => {
  return (
    <div className="flex items-start gap-3 bg-[#232931] rounded-xl p-4 mb-3 shadow-sm">
      <img
        src={userImage}
        alt={userName}
        className="w-10 h-10 rounded-full border-2 border-[#393e46] object-cover"
      />
      <div>
        <div className="text-sm font-semibold text-white mb-1">{userName}</div>
        <div className="text-gray-200 text-[15px]">{comment}</div>
      </div>
    </div>
  );
};
