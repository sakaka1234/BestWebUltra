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
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/friends", protectRoute, getFriendPosts);
router.get("/topic/:topicId", protectRoute, getPostsByTopic);
router.get("/search", protectRoute, searchPosts);
router.delete("/:id", protectRoute, deletePost);
router.post("/:postId/comment", protectRoute, addComment);
router.get("/all", protectRoute, getAllPosts);
router.get("/:id", protectRoute, getPostById);
export default router;
