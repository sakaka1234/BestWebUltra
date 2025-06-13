import React from "react";
import { useAcceptFriendInvitation, useRejectFriendInvitation } from "../../../services";

interface FriendCardProps {
  userImage: string;
  userName: string;
  id: string;
}

export const FriendCardInvite: React.FC<FriendCardProps> = ({
  userImage,
  userName,
  id
}) => {
  const onAccept = () => {
    useAcceptFriendInvitation().mutate(id);
  };
  const onReject = () => {
    useRejectFriendInvitation().mutate(id);
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
            onClick={onAccept}
            className="px-4 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors duration-150"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="px-4 py-1 bg-white/10 hover:bg-white/20 text-gray-200 border border-gray-400/30 rounded-lg font-medium transition-colors duration-150"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export const FriendCard = ({
  userImage,
  userName,
}: {  userImage: string,
  userName: string,}) => {
  return (
    <div className="bg-[#232931] rounded-xl p-5 flex items-center gap-4 shadow-md w-[300px]">
      <img
        src={userImage}
        alt={userName}
        className="w-14 h-14 rounded-full border-2 border-[#393e46] object-cover"
      />
      <span className="text-lg font-semibold text-white">
        {userName}
      </span>
    </div>
  );
};
