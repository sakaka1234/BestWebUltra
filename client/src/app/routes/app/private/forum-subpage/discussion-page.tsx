import { PostCard, DiscussionCard } from "../../../../../components/ui";

export const DiscussionPage = () => {
  return (
    <div className="flex flex-col gap-[20px] mx-auto flex-1 max-[700px] overflow-y-auto ">
      <PostCard
        postImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        userImage="https://randomuser.me/api/portraits/men/32.jpg"
        userName="John Doe"
        title="Sample Post Title"
        content="This is the content of the post. It can be long or short."
        date="2 hours ago"
      />
      <div>
        <div className="flex items-center bg-[#23272f] rounded-2xl px-7 py-4 gap-7 w-full">
          <img
            src={"https://randomuser.me/api/portraits"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover bg-[#ffe6c7] border-2 border-[#23272f]"
          />
          <input
            type="text"
            placeholder="Let's comment on this post..."
            className="flex-1 bg-[#23272f] text-[#b0b8c1] placeholder-[#b0b8c1] px-4 py-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-[#8c8b8b]"
          />
          <button className="bg-[#ff7849] hover:bg-[#ff6a2b] text-white font-semibold px-6 py-2 rounded-xl transition-colors">
            Comment
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <DiscussionCard
          userImage="link_avatar"
          userName="Tên người comment"
          comment="Nội dung comment"
        />
        <DiscussionCard
          userImage="link_avatar"
          userName="Tên người comment"
          comment="Nội dung comment"
        />
        <DiscussionCard
          userImage="link_avatar"
          userName="Tên người comment"
          comment="Nội dung comment"
        />
        <DiscussionCard
          userImage="link_avatar"
          userName="Tên người comment"
          comment="Nội dung comment"
        />
        <DiscussionCard
          userImage="link_avatar"
          userName="Tên người comment"
          comment="Nội dung comment"
        />
      </div>
    </div>
  );
};
