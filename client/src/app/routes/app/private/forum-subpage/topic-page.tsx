import { CreatePost } from "../../../../../components/sections";
import { PostCard } from "../../../../../components/ui";
import { useTopicPosts } from "../../../../../services";
import { useParams } from "react-router-dom";

export const TopicPage = () => {
  const { topicId } = useParams();
  const { data: posts, isLoading } = useTopicPosts(topicId as string); 

  return (
    <div className="flex flex-col flex-1 gap-[20px]">
      <CreatePost avatarUrl="/images/avatar.png" />
      <div className="flex flex-col gap-[10px] overflow-y-auto max-h-screen">
        {isLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          posts?.data?.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              postImage={post.image || "link_ảnh_post"}
              userImage={post.author.profilePic || "link_ảnh_user"}
              userName={post.author._id}
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
