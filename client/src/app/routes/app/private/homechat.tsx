import { Sidebar } from "./chat-components/sidebar";
import { NavChatLayOut } from "../../../../components/layouts/auth/navchat-layout";
import { useChatStore } from "../../../../hooks/usechatstore";
import { NoChatSelected } from "./chat-components/nochatselected";
import { ChatContainer } from "./chat-components/chatcontainer";
import { useAuthStore } from "../../../../hooks";
import { useEffect } from "react";
export const HomeChat = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();

  useEffect(() => {
    // Log để debug
    console.log("Auth User:", authUser?._id);
    console.log("Online Users:", onlineUsers);
    console.log(
      "Is current user online:",
      onlineUsers.includes(authUser?._id || "")
    );
  }, [onlineUsers, authUser]);
  return (
    <NavChatLayOut>
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </NavChatLayOut>
  );
};
