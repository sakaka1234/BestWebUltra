import { Sidebar } from "./chat-components/sidebar";
import { NavChatLayOut } from "../../../../components/layouts/auth/navchat-layout";
import { useChatStore } from "../../../../hooks/usechatstore";
import { NoChatSelected } from "./chat-components/nochatselected";
import { ChatContainer } from "./chat-components/chatcontainer";
export const HomeChat = () => {
  const { selectedUser } = useChatStore();
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
