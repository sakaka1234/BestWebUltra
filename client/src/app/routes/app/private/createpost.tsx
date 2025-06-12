import { useState } from "react";
import { X, Image, Heart, MessageCircle, Share2 } from "lucide-react";

export const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePost = async () => {
    if (!postContent.trim()) return;

    setIsPosting(true);

    // Simulate posting delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPost = {
      id: Date.now(),
      content: postContent,
      timestamp: new Date().toLocaleString("vi-VN"),
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
    setIsPosting(false);
    setIsOpen(false);
  };

  return (
    <div className="w-[450px] ">
      <div className="bg-gray-700 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-100">
            Create Your Post
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">😎</span>
            </div>
            <span className="font-medium text-gray-100">Xuân Tiến</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Hey Tien, what are you thinking?"
            className="w-full h-32 resize-none border-none outline-none placeholder-gray-400 text-lg bg-gray-600 text-gray-100 rounded-lg px-2 py-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-center py-3 border bg-gray-600 border-gray-200 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <Image className="w-6 h-6 text-green-500 mr-2 group-hover:text-gray-600" />
            <span className="text-gray-100 group-hover:text-gray-600 transition-colors">
              Add image
            </span>
          </div>
        </div>

        {/* Post Button */}
        <div className="p-4 border-t">
          <button
            onClick={handlePost}
            disabled={!postContent.trim() || isPosting}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              postContent.trim() && !isPosting
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-500 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};
