import React from 'react';

interface CommentCardProps {
  avatar: string;
  name: string;
  company: string;
  content: string;
  className?: string;
}

export const CommentCard: React.FC<CommentCardProps> = ({ avatar, name, company, content, className }) => {
  return (
    <div className={`bg-[#18181B] rounded-xl p-8 border border-transparent hover:border-gray-900 transition-colors shadow-lg ${className || ''}`}> 
      <div className="flex items-center mb-4">
        <img src={avatar} alt={name} className="w-14 h-14 rounded-full mr-4 object-cover" />
        <div>
          <div className="font-bold text-white text-lg leading-tight">{name}</div>
          <div className="text-base text-gray-400">{company}</div>
        </div>
      </div>
      <div className="text-base text-white/90">{content}</div>
    </div>
  );
};
