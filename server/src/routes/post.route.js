import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  addComment,
  getCommentsByPostId,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/all", getAllPosts);
router.get("/:id", getPostById);
router.post("/:postId/comment", protectRoute, addComment);
router.get("/:postId/comments", getCommentsByPostId);
router.delete("/:id", protectRoute, deletePost);

export default router;
