import { useState } from "react";
import { NavChat } from "../../../app/routes/app/private/navchat";
export const NavChatLayOut = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setDark] = useState(true);
  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <div className="min-h-screen flex flex-col ">
        <NavChat isDark={isDark} toggleTheme={() => setDark(!isDark)} />
        {children}
      </div>
    </div>
  );
};
