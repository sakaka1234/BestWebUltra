import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectRequest,
  getFriendList,
  getReceivedRequests,
  getSentRequests,
} from "../controllers/friend.controller.js";
const router = express.Router();

router.post("/send/:friendId", protectRoute, sendFriendRequest);
router.post("/accept/:requestId", protectRoute, acceptFriendRequest);
router.delete("/reject/:requestId", protectRoute, rejectRequest);
router.get("/list", protectRoute, getFriendList);
router.get("/requests/reiceived", protectRoute, getReceivedRequests);
router.get("/requests/sent", protectRoute, getSentRequests);

export default router;
