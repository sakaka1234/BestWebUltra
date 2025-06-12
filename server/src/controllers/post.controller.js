import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import ListFriend from "../models/listfriend.model.js";
import cloudinary from "../lib/cloudinary.js";
import Topic from "../models/topic.model.js";
// Create post
export const createPost = async (req, res) => {
  try {
    const { title, content, topicId, image } = req.body;
    const user = req.user; // Lấy toàn bộ user object thay vì chỉ _id

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
      userId: user._id,
      // Thêm toàn bộ thông tin user vào post
    });

    await newPost.save();

    // Populate thêm thông tin cho post trước khi trả về
    await newPost.populate([
      { path: "userId", select: "fullName email profilePic" },
      { path: "topicId", select: "name" },
    ]);

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in createPost:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get friend posts
export const getFriendPosts = async (req, res) => {
  try {
    const user = req.user; // Lấy user object

    // Get friend IDs
    const friends = await ListFriend.find({
      $or: [
        { userId: user._id, status: true },
        { friendId: user._id, status: true },
      ],
    });

    const friendIds = friends.map((friend) =>
      friend.userId.equals(user._id) ? friend.friendId : friend.userId
    );

    // Get posts from friends with full user info
    const posts = await Post.find({
      userId: { $in: friendIds },
    })
      .populate("userId", "fullName email profilePic")
      .populate("topicId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getFriendPosts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get posts by topic
export const getPostsByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const posts = await Post.find({ topicId })
      .populate("userId", "fullName email profilePic")
      .populate("topicId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getPostsByTopic:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search posts
export const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    })
      .populate("userId", "fullName email profilePic")
      .populate("topicId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in searchPosts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete comments
    await Comment.deleteMany({ postId: id });

    // Delete post
    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
      deletedBy: user.fullName,
    });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add comment
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const user = req.user;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new Comment({
      content,
      postId,
      userId: user._id,
    });

    await newComment.save();

    // Add comment to post
    post.comments.push(newComment._id);
    await post.save();

    // Populate user info
    await newComment.populate("userId", "fullName email profilePic");

    res.status(201).json({
      ...newComment.toJSON(),
      user: {
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in addComment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//get all posts
// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .select("title content imageURL createdAt")
      .populate("userId", "fullName profilePic")
      .populate("topicId", "name")
      .sort({ createdAt: -1 });

    // Format the response
    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      title: post.title,
      content: post.content,
      postImage: post.imageURL,
      author: {
        _id: post.userId._id,
        name: post.userId.fullName,
        profilePic: post.userId.profilePic,
      },
      topic: post.topicId.name,
      createdAt: post.createdAt,
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
