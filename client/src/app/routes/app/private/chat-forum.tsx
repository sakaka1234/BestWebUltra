import { Outlet } from "react-router-dom";
import { HeaderForum } from "../../../../components/layouts/forum";
import { MainForum } from "../../../../components/layouts/forum";

export const ChatForumRouter = () => {
    const authUser = localStorage.getItem("authUser");
    const avatarUrl = authUser ? JSON.parse(authUser).profilePic : "/images/avatar.png";
    const userName = authUser ? JSON.parse(authUser).name : "Undefined User";
    return (
        <>
            <HeaderForum userName={userName} avatarUrl={avatarUrl} />
            <MainForum>
                <Outlet />
            </MainForum>
        </>
    )
}
