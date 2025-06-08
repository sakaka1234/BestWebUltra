import { NavChat } from "../../../app/routes/app/private/navchat";
export const NavChatLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <NavChat />
        {children}
      </div>
    </>
  );
};
