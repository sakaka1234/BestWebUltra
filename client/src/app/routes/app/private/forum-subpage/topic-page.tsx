import { CreatePost } from "../../../../../components/sections";
import { PostCard } from "../../../../../components/ui";

export const TopicPage = () => {
  return (
    <div className="flex flex-col flex-1 gap-[20px] ">
      <CreatePost avatarUrl="/images/avatar.png" />
      <div className="flex flex-col gap-[10px] overflow-y-auto max-h-screen">
        <PostCard
          postImage="link_ảnh_post"
          userImage="link_ảnh_user"
          userName="Tên user"
          title="Tiêu đề"
          content="Nội dung mô tả"
          date="Ngày đăng"
          onClick={() => {}}
        />
        <PostCard
          postImage="link_ảnh_post"
          userImage="link_ảnh_user"
          userName="Tên user"
          title="Tiêu đề"
          content="Nội dung mô tả"
          date="Ngày đăng"
          onClick={() => {}}
        />
        <PostCard
          postImage="link_ảnh_post"
          userImage="link_ảnh_user"
          userName="Tên user"
          title="Tiêu đề"
          content="Nội dung mô tả"
          date="Ngày đăng"
          onClick={() => {}}
        />
        <PostCard
          postImage="link_ảnh_post"
          userImage="link_ảnh_user"
          userName="Tên user"
          title="Tiêu đề"
          content="Nội dung mô tả"
          date="Ngày đăng"
          onClick={() => {}}
        />
        <PostCard
          postImage="link_ảnh_post"
          userImage="link_ảnh_user"
          userName="Tên user"
          title="Tiêu đề"
          content="Nội dung mô tả"
          date="Ngày đăng"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
