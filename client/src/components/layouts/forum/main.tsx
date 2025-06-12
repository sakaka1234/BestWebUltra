import { FC, PropsWithChildren } from "react";
import { SideBarForum } from "./side-bar";

export const MainForum: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex w-full h-[89vh] bg-[#1E252B]">
      <section className="flex flex-1 w-full gap-[30px] px-[60px] py-[20px]">
        <SideBarForum />
        {children}
      </section>
    </main>
  );
};
