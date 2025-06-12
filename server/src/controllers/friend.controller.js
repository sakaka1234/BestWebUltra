import ListFriend from "../models/listfriend.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// gửi lời mời kết bạn
export const sendFriendRequest = async (req, res) => {
  try {
    const user = req.user; // Thay vì const userId = req.user._id
    const { friendId } = req.params;

    const existingRequest = await ListFriend.findOne({
      $or: [
        { userId: user._id, friendId },
        { userId: friendId, friendId: user._id },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists" });
    }

    const newFriendRequest = new ListFriend({
      userId: user._id,
      friendId,
      status: false,
      user: user, // Thêm thông tin người gửi
    });
    await newFriendRequest.save();

    const reiceiverSocketId = getReceiverSocketId(friendId);
    if (reiceiverSocketId) {
      io.to(reiceiverSocketId).emit("newFriendRequest", {
        userId: user._id,
        friendId,
      });
    }

    res.status(201).json(newFriendRequest);
  } catch (error) {
    console.error("Error in send friend request", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Chấp nhận lời kết bạn
export const acceptFriendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const { requestId } = req.params;

    const friendRequest = await ListFriend.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.friendId.toString() !== myId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    friendRequest.status = true;
    await friendRequest.save();

    res.status(200).json(friendRequest);
  } catch (error) {
    console.error("Error in accept friend request", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Từ chối lời kết bạn
export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    await ListFriend.findByIdAndDelete(requestId);
    res.status(200).json({ message: "Friend request removed" });
  } catch (error) {
    console.error("Error in reject request");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Lấy danh sách bạn bè
export const getFriendList = async (req, res) => {
  try {
    const user = req.user; // Thay vì const userId = req.user._id

    const friends = await ListFriend.find({
      $or: [
        { userId: user._id, status: true },
        { friendId: user._id, status: true },
      ],
    }).populate("userId friendId", "-password");
    res.status(200).json(friends);
  } catch (error) {
    console.error("Error in get friend list", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Lấy danh sách lời mời kết bạn đã nhận
export const getReceivedRequests = async (req, res) => {
  try {
    const myId = req.user._id;

    const requests = await ListFriend.find({
      friendId: myId,
      status: false,
    }).populate("userId", "-password");

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error in get received requests", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Lấy danh sách lời mời kết bạn bạn đã gửi
export const getSentRequests = async (req, res) => {
  try {
    const myId = req.user._id;

    const requests = await ListFriend.find({
      userId: myId,
      status: false,
    }).populate("friendId", "-password");
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error in get sent requests", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
