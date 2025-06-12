import React from "react";
import { Message, Friends, Home, Search } from "../../../assets/icons";

interface NavItem {
  icon: React.ReactNode;
  path: string;
}

const navList: NavItem[] = [
  {
    icon: <Home />,
    path: "/forum",
  },
  {
    icon: <Friends />,
    path: "/forum/friend",
  },
  {
    icon: <Message />,
    path: "/forum/message",
  },
];

interface HeaderForumProps {
  avatarUrl?: string;
  userName: string;
}

export const HeaderForum: React.FC<HeaderForumProps> = ({
  avatarUrl,
  userName,
}) => {
  const navActive = (path: string) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? "bg-[#DA6227] text-white" : "text-[#F7F7F7]";
  };

  return (
    <header className="flex items-center justify-center bg-[#262D34]">
      <div className="flex w-full items-center justify-between px-[100px] py-[20px] ">
        {/* logo */}
        <div className="flex items-center justify-center gap-[10px]">
          <span
            className="flex  items-center justify-center w-[30px] h-[30px] p-[4px] rounded-[6px] bg-[#F7F7F7]
                        text-[26px] text-[#DA6227] font-[700] leading-[38px]"
          >
            N
          </span>
          <p className="text-[26px] text-[#DA6227] font-[700] leading-[38px]">
            Nexora
          </p>
        </div>
        <div className="flex items-center justify-between gap-[20px]">
          {/* navigation list */}
          <div>
            <ul className="flex items-center gap-[20px]">
              {navList.map((item, index) => (
                <li
                  key={index}
                  className={`hover:bg-[#31363B] transition-all duration-200 rounded-[6px] ${navActive(item.path)}`}
                >
                  <a
                    href={item.path}
                    className="flex items-center justify-center p-[10px] "
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* search input*/}
          <div className="relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-[500px] h-[40px] rounded-[10px] bg-[#31363B] text-[#F7F7F7] placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#DA6227] transition-all duration-200"
            />
            <Search className="absolute right-3" />
          </div>
        </div>
        {/* profile */}
        <a
          href="/forum/profile"
          className="flex items-center gap-2 px-3 py-1 rounded-[10px] hover:bg-[#31363B] transition-all duration-200"
        >
          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-[40px] h-[40px] rounded-[10px] border-2 border-[#DA6227] object-cover bg-[#F7F7F7]"
            />
          ) : (
            <span className="w-[40px] h-[40px] rounded-[10px] border-2 border-[#DA6227] flex items-center justify-center bg-[#F7F7F7] text-[32px]">
              <span role="img" aria-label="avatar">
                🧑‍💻
              </span>
            </span>
          )}
          {/* Name */}
          <span className="text-[16px] font-bold text-[#F7F7F7]">
            {userName} Dang Xuan Tien
          </span>
          {/* Arrow */}
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M7 10l5 5 5-5"
              stroke="#F7F7F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </header>
  );
};
