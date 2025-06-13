import { useState } from "react";
import { CreatePost as CreatePostModal } from "../../../app/routes/app/private/createpost";

export const CreatePost = ({ avatarUrl }: { avatarUrl: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex items-center bg-[#23272f] rounded-2xl px-7 py-4 gap-7 w-full">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover bg-[#ffe6c7] border-2 border-[#23272f]"
        />
        <button
          onClick={openModal}
          className="flex-1 text-left bg-[#23272f] text-[#b0b8c1] placeholder-[#b0b8c1] px-4 py-3 rounded-xl outline-none border-none hover:ring-2 hover:ring-[#ff7849] transition-all"
        >
          Let's share what's going on your mind...
        </button>
        <button
          onClick={openModal}
          className="bg-[#ff7849] hover:bg-[#ff6a2b] text-white font-semibold px-6 py-2 rounded-xl transition-colors"
        >
          Create Post
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && <CreatePostModal onClose={closeModal} />}
    </>
  );
};
