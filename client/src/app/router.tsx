import { createBrowserRouter } from "react-router-dom";
import { protectedRouter } from "../libs/protected-router";
/**
 * create main router
 */
export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "",
      lazy: async () => {
        const { AppRouterRoot } = await import("./routes/root");
        return { Component: AppRouterRoot };
      },
      children: [
        {
          path: "",
          lazy: async () => {
            const { HomeRouter } = await import("./routes/app/public/home");
            return { Component: HomeRouter };
          },
        },
        {
          path: "login",
          lazy: async () => {
            const { LoginRouter } = await import("./routes/app/public/login");
            return { Component: LoginRouter };
          },
        },
        {
          path: "signup",
          lazy: async () => {
            const { SignUpRouter } = await import("./routes/app/public/signup");
            return { Component: SignUpRouter };
          },
        },
        {
          path: "profile",
          loader: protectedRouter,
          lazy: async () => {
            const { ProfileRouter } = await import(
              "./routes/app/private/profile"
            );
            return { Component: ProfileRouter };
          },
        },
        {
          path: "homechat",

          lazy: async () => {
            const { HomeChat } = await import("./routes/app/private/homechat");
            return { Component: HomeChat };
          },
        },
        {
          path: "forum",
          loader: protectedRouter,
          lazy: async () => {
            const { ChatForumRouter } = await import(
              "./routes/app/private/chat-forum"
            );
            return { Component: ChatForumRouter };
          },
          children: [
            {
              path: "",
              loader: protectedRouter,
              lazy: async () => {
                const { HomePage } = await import(
                  "./routes/app/private/forum-subpage/home-page"
                );
                return { Component: HomePage };
              },
            },
            {
              path: "topic/:topicId",
              loader: protectedRouter,
              lazy: async () => {
                const { TopicPage } = await import(
                  "./routes/app/private/forum-subpage/topic-page"
                );
                return { Component: TopicPage };
              },
            },
            {
              path: "friend",
              loader: protectedRouter,
              lazy: async () => {
                const { FriendPage } = await import(
                  "./routes/app/private/forum-subpage/friend-page"
                );
                return { Component: FriendPage };
              },
            },
            {
              path: "discussion/:threadId",
              loader: protectedRouter,
              lazy: async () => {
                const { DiscussionPage } = await import(
                  "./routes/app/private/forum-subpage/discussion-page"
                );
                return { Component: DiscussionPage };
              },
            },
          ],
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRouter } = await import("./routes/not-found");
        return { Component: NotFoundRouter };
      },
    },
  ]);
};
