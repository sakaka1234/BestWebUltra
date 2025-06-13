import { CreatePost } from "../../../../../components/sections";
import { PostCard } from "../../../../../components/ui";
import { useHomePosts } from "../../../../../services";

export const HomePage = () => {
  const { data: posts, isLoading } = useHomePosts();
  const authUser = localStorage.getItem("authUser");
  const avatarUrl = authUser
    ? JSON.parse(authUser).profilePic
    : "/images/user.png";
  return (
    <div className="flex flex-col flex-1 gap-[20px]">
      <CreatePost avatarUrl={avatarUrl} />
      <div className="flex flex-col gap-[10px] overflow-y-auto max-h-screen">
        {isLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          posts?.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              postImage={post.imageURL || "link_ảnh_post"}
              userImage={post.author.profilePic || "link_ảnh_user"}
              userName={post.author.name}
              title={post.title}
              content={post.content}
              date={new Date(post.createdAt).toLocaleDateString()}
            />
          ))
        )}
      </div>
    </div>
  );
};
