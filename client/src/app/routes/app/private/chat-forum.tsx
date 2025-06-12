import { Outlet } from "react-router-dom";
import { HeaderForum } from "../../../../components/layouts/forum";
import { MainForum } from "../../../../components/layouts/forum";

export const ChatForumRouter = () => {
    return (
        <>
            <HeaderForum userName="" />
            <MainForum>
                <Outlet />
            </MainForum>
        </>
    )
}
