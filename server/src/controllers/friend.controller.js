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
    const user = req.user;

    const friends = await ListFriend.find({
      $or: [
        { userId: user._id, status: true },
        { friendId: user._id, status: true },
      ],
    }).populate("userId friendId", "fullName email profilePic");

    // Format lại response để chỉ lấy thông tin của bạn bè
    const formattedFriends = friends.map((friend) => {
      // Nếu userId là của mình thì lấy thông tin của friendId và ngược lại
      const friendInfo = friend.userId._id.equals(user._id)
        ? friend.friendId
        : friend.userId;

      return {
        _id: friend._id,
        friend: {
          _id: friendInfo._id,
          fullName: friendInfo.fullName,
          email: friendInfo.email,
          profilePic: friendInfo.profilePic,
        },
      };
    });

    res.status(200).json(formattedFriends);
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
    }).populate("userId", "fullName email profilePic");

    // Format response to match getSentRequests structure
    const formattedRequests = requests.map((request) => ({
      _id: request._id,
      sender: {
        _id: request.userId._id,
        fullName: request.userId.fullName,
        email: request.userId.email,
        profilePic: request.userId.profilePic,
      },
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Error in get received requests", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Lấy danh sách lời mời kết bạn bạn đã gửi
export const getSentRequests = async (req, res) => {
  try {
    const myId = req.user._id;

    const sentRequests = await ListFriend.find({
      userId: myId,
      status: false,
    }).populate("friendId", "fullName email profilePic");
    const formattedRequests = sentRequests.map((request) => ({
      _id: request._id,
      recipient: {
        _id: request.friendId._id,
        fullName: request.friendId.fullName,
        email: request.friendId.email,
        profilePic: request.friendId.profilePic,
      },
      createdAt: request.createdAt,
    }));
    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Error in get sent requests", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
