import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createPost,
  getFriendPosts,
  getPostsByTopic,
  searchPosts,
  deletePost,
  addComment,
  getAllPosts,
  getPostById,
  getCommentsInPost,
  getTopics,
} from "../controllers/post.controller.js";

const router = express.Router();

// Specific routes first
router.post("/create", protectRoute, createPost);
router.get("/all", protectRoute, getAllPosts);
router.get("/friends", protectRoute, getFriendPosts);
router.get("/topic/:topicId", protectRoute, getPostsByTopic);
router.get("/search", protectRoute, searchPosts);
router.get("/topics/all", protectRoute, getTopics);
// Parameterized routes last
router.get("/:id", protectRoute, getPostById);
router.post("/:postId/comment", protectRoute, addComment);
router.get("/:postId/comments", protectRoute, getCommentsInPost);
router.delete("/:id", protectRoute, deletePost);
export default router;
