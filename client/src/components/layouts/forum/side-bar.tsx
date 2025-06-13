import { Link } from "react-router-dom";
import { Career, Connect, Tutorial } from "../../../assets/icons";

interface SideBarItem {
  icon: React.ReactNode;
  label: string;
  des: string;
  path: string;
}

const sideBarItems: SideBarItem[] = [
  {
    icon: <Connect />, // Replace with actual icon component
    label: "Friends Seeking",
    des: "Find friends to connect with",
    path: "/forum/topic/684ad8af513c816bccc7b56f",
  },
  {
    icon: <Career />, // Replace with actual icon component
    label: "Job Seeking",
    path: "/forum/topic/684ad8af513c816bccc7b570",
    des: "Explore job opportunities",
  },
  {
    icon: <Tutorial />, // Replace with actual icon component
    label: "Project Collaboration",
    path: "/forum/topic/684ad8af513c816bccc7b571",
    des: "Collaborate on projects",
  },
];

export const SideBarForum = () => {
  const sideBarActive = (path: string) => {
    const currentPath = window.location.pathname;
    return currentPath === path
      ? "bg-[#31363B] text-[#FF571A]"
      : "text-[#F7F7F7]";
  };

  return (
    <div className="w-[300px] p-[20px] rounded-[16px] bg-[#262D34]">
      <span className="text-[18px] font-[600] leading-[24px]">
        Discussion Topic
      </span>
      <ul className="mt-[20px] flex flex-col gap-[15px]">
        {sideBarItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-[10px] rounded-[10px] p-[5px] hover:bg-[#31363B] transition-all duration-200 
                    ${sideBarActive(item.path)}`}
          >
            <Link
              to={item.path}
              className="flex items-center gap-[10px] transition-colors duration-200"
            >
              {item.icon}
              <div className="flex flex-col gap-[1px]">
                <span className="block text-[16px] font-[500] leading-[24px]">
                  {item.label}
                </span>
                <span className="block text-[12px] text-[#A1A1A1] leading-[20px]">
                  {item.des}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
