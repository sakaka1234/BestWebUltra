import { useState, useEffect } from "react";
import { X, Image } from "lucide-react";
import { useAuthStore } from "../../../../hooks/useAuthStore";
import { toast } from "react-hot-toast";
import { getTopics, Topic, useCreatePost } from "../../../../services";
export const CreatePost = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [topicId, setTopicId] = useState("");

  const { authUser } = useAuthStore();
  const createPostMutation = useCreatePost();
  const isCreatingPost = createPostMutation.isPending;
  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedImage(null);
    setTopicId("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }
    if (!topicId) {
      toast.error("Please select a topic");
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        title: title.trim() || undefined,
        content: content.trim(),
        image: selectedImage || undefined,
        topicId,
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };
  const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getTopics();
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast.error("Failed to load topics");
      }
    };

    fetchTopics();
  }, []);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-gray-700 rounded-lg shadow-xl w-[450px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <h2 className="text-lg font-semibold text-gray-100">Create Post</h2>
            <button
              type="button"
              onClick={handleClose}
              className="p-1 hover:bg-gray-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-300 hover:text-gray-100" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-600">
            <div className="flex items-center space-x-3">
              {authUser?.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
              )}
              <span className="font-medium text-gray-100">
                {authUser?.fullName || "Anonymous"}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4 space-y-4">
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Topic</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              className="w-full p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              required
              className="w-full h-32 p-2 bg-gray-600 text-gray-100 rounded-lg border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            />

            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="max-h-60 rounded-lg w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            {/* Image Upload */}
            <label className="flex items-center justify-center p-2 border border-gray-500 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors group">
              <Image className="w-5 h-5 text-gray-300 mr-2 group-hover:text-gray-100" />
              <span className="text-gray-300 group-hover:text-gray-100">
                Add Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="p-4 border-t border-gray-600">
            <button
              type="submit"
              disabled={isCreatingPost || !content.trim() || !topicId}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                isCreatingPost || !content.trim() || !topicId
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isCreatingPost ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
