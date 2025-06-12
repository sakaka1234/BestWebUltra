import Post from "../models/post.model";
import Comment from "../models/comment.model";
import cloudinary from "../lib/cloudinary";
//Tạo post
export const createPost = async (req, res) => {
  try {
    const { title, content, topicId, image } = req.body;
    const userId = req.user._id;

    let imageURL;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }
    const newPost = new Post({
      title,
      content,
      topicId,
      imageURL,
      userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in create post", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Lấy tất cả các post
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "fullName email profilePic")
      .populate("topicId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in get all Posts", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Lấy Post theo id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "fullName email profilePic")
      .populate("topicId", "name");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //Get comments for this post
    const comments = await Comment.find({ postId: post._id })
      .populate("userId", "fullName email profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json({ post, comments });
  } catch (error) {
    console.error("Error in get post by id", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// thêm comment vào một post cụ thể
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    const populatedComment = await Comment.findById(newComment._id).populate(
      "userId",
      "fullName email profilePic"
    );
    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error in addComment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Lấy tất cả comment từ một post
export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .populate("userId", "fullName email profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in getCommentsByPostId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Xóa post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.deleteMany({ postId: post._id });
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
