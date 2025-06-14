import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../hooks";
import { LogOut, MessageSquare, User, Sun, Moon } from "lucide-react";
interface NavChatProps {
  isDark: boolean;
  toggleTheme: () => void;
}
export const NavChat = ({ isDark, toggleTheme }: NavChatProps) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16 ">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Nexora</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {/* Settings */}
            <button
              onClick={toggleTheme}
              className="btn btn-sm gap-2 transition-colors flex"
            >
              {isDark ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>
            {/* Profile */}
            <Link to={"/profile"} className={`btn btn-sm gap-2`}>
              <User className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            {/* Log out */}
            <button className="flex gap-2 items-center" onClick={handleLogout}>
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
