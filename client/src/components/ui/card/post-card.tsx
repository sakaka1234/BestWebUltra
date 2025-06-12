import React from "react";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  postImage: string;
  userImage: string;
  userName: string;
  title: string;
  content: string;
  date: string;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  postImage,
  userImage,
  userName,
  title,
  content,
  date,
}) => {
  const navigate = useNavigate();
  const onClick = (id: string, e: any) => {
    e.stopPropagation();
    navigate(`/forum/discussion/${id}`);
  };

  return (
    <div
      className="bg-[#232931] rounded-2xl p-6 flex gap-6 items-center cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={(e) => onClick("id test", e)}
    >
      <div className="flex-shrink-0">
        <img
          src={postImage}
          alt="Post"
          className="w-36 h-36 rounded-xl object-cover bg-[#181c20]"
        />
      </div>
      <div className="flex-1">
        <div className="text-xl font-semibold text-white mb-1">{title}</div>
        <div className="text-gray-300 mb-3 line-clamp-2">{content}</div>
        <div className="flex items-center gap-3 mt-4">
          <img
            src={userImage}
            alt={userName}
            className="w-9 h-9 rounded-full border-2 border-[#393e46] object-cover"
          />
          <div>
            <div className="text-white font-medium text-sm">{userName}</div>
            <div className="text-xs text-gray-400">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
