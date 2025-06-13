import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import ListFriend from "../models/listfriend.model.js";
import cloudinary from "../lib/cloudinary.js";
import Topic from "../models/topic.model.js";
// Create post
export const createPost = async (req, res) => {
  try {
    const { title, content, topicId, image } = req.body;
    const user = req.user;

    // Validate required fields
    if (!content || !topicId) {
      return res
        .status(400)
        .json({ message: "Content and topic are required" });
    }

    // Upload image if provided
    let imageURL;
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "posts",
        });
        imageURL = uploadResponse.secure_url;
      } catch (error) {
        console.error("Image upload error:", error);
        return res.status(400).json({ message: "Image upload failed" });
      }
    }

    // Create new post
    const newPost = new Post({
      title: title || undefined, // Make title optional
      content,
      topicId,
      imageURL,
      userId: user._id,
    });

    await newPost.save();

    // Populate user and topic info
    await newPost.populate([
      { path: "userId", select: "fullName profilePic" },
      { path: "topicId", select: "name" },
    ]);

    // Format response
    const formattedPost = {
      _id: newPost._id,
      title: newPost.title,
      content: newPost.content,
      postImage: newPost.imageURL,
      author: {
        _id: newPost.userId._id,
        name: newPost.userId.fullName,
        profilePic: newPost.userId.profilePic,
      },
      topic: newPost.topicId.name,
      createdAt: newPost.createdAt,
    };

    res.status(201).json(formattedPost);
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
      .select("title content imageURL createdAt") // Explicitly select fields
      .populate("userId", "fullName profilePic")
      .populate("topicId", "name")
      .sort({ createdAt: -1 });

    // Format the response to match Post type
    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      title: post.title,
      content: post.content,
      postImage: post.imageURL,
      imageURL: post.imageURL,
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

    // Populate thông tin người comment từ database
    await newComment.populate("userId", "fullName profilePic");

    // Add comment to post
    post.comments.push(newComment._id);
    await post.save();

    // Trả về thông tin của người comment từ database
    res.status(201).json({
      _id: newComment._id,
      content: newComment.content,
      commenter: {
        _id: newComment.userId._id,
        name: newComment.userId.fullName,
        profilePic: newComment.userId.profilePic,
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
// Get post by id
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("userId", "fullName profilePic")
      .populate("topicId", "name")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "fullName profilePic",
        },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Format response
    const formattedPost = {
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
      comments: post.comments.map((comment) => ({
        _id: comment._id,
        content: comment.content,
        commenter: {
          _id: comment.userId._id,
          name: comment.userId.fullName,
          profilePic: comment.userId.profilePic,
        },
      })),
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    console.error("Error in getPostById:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Get comments in post
export const getCommentsInPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ postId })
      .populate("userId", "fullName profilePic")
      .sort({ createdAt: -1 });

    // Format comments response
    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      content: comment.content,
      commenter: {
        _id: comment.userId._id,
        name: comment.userId.fullName,
        profilePic: comment.userId.profilePic,
      },
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    console.error("Error in getCommentsInPost:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().select("_id name");
    res.status(200).json(topics);
  } catch (error) {
    console.error("Error in getTopics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
