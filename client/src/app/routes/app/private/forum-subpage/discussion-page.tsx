import { useState } from "react";
import { PostCard, DiscussionCard } from "../../../../../components/ui";
import { useParams } from "react-router-dom";
import {
  useAddDiscussionComment,
  useDiscussionComments,
  usePostDetails,
} from "../../../../../services";

export const DiscussionPage = () => {
  const { discussionId } = useParams();
  const { data: comments, isLoading } = useDiscussionComments(
    discussionId as string
  );
  const { data: postDetails } = usePostDetails(discussionId as string);

  const [commentInput, setCommentInput] = useState("");
  const authUser = localStorage.getItem("authUser");
  const avatarUrl = authUser
    ? JSON.parse(authUser).profilePic
    : "/images/avatar.png";
  const userId = authUser ? JSON.parse(authUser)._id : "undefined_user_id";

  const handleCommentSubmit = () => {
    console.log("Comment data:", commentInput);
    const data = {
      content: commentInput,
      userId: userId,
    };
    useAddDiscussionComment(discussionId as string).mutate(data);
    setCommentInput("");
  };

  return (
    <div className="flex flex-col gap-[20px] mx-auto flex-1 max-[700px] overflow-y-auto">
      {postDetails ? (
        <PostCard
          id={postDetails.data._id}
          postImage={postDetails.data.image || "link_ảnh_post"}
          userImage={postDetails.data.author.profilePic || "link_avatar"}
          userName={postDetails.data.author.name || "Unknown User"}
          title={postDetails.data.title}
          content={postDetails.data.content}
          date={new Date(postDetails.data.createdAt).toLocaleDateString()}
        />
      ) : (
        <div className="text-gray-400">Loading post details...</div>
      )}

      {/* Input comment */}
      <div>
        <div className="flex items-center bg-[#23272f] rounded-2xl px-7 py-4 gap-7 w-full">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover bg-[#ffe6c7] border-2 border-[#23272f]"
          />
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Let's comment on this post..."
            className="flex-1 bg-[#23272f] text-[#b0b8c1] placeholder-[#b0b8c1] px-4 py-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-[#8c8b8b]"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-[#ff7849] hover:bg-[#ff6a2b] text-white font-semibold px-6 py-2 rounded-xl transition-colors"
          >
            Comment
          </button>
        </div>
      </div>

      {/* List comments */}
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="text-gray-400">Loading comments...</div>
        ) : (
          comments?.data?.map((comment) => (
            <DiscussionCard
              key={comment._id}
              id={comment.commenter._id}
              userImage={comment.commenter.profilePic || "link_avatar"}
              userName={comment.commenter.name}
              comment={comment.content}
            />
          ))
        )}
      </div>
    </div>
  );
};
