import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import ListFriend from "../models/listfriend.model.js";
export const getUserForSidebar = async (req, res) => {
  try {
    const user = req.user; // Thay vì const myId = req.user._id

    const friends = await ListFriend.find({
      $or: [
        { userId: user._id, status: true },
        { friendId: user._id, status: true },
      ],
    });

    const friendIds = friends.map((friend) =>
      friend.userId.equals(user._id) ? friend.friendId : friend.userId
    );

    const friendList = await User.find({
      _id: { $in: friendIds },
    }).select("-password");
    res.status(200).json(friendList);
  } catch (error) {
    console.error("Error in getUserForSidebar :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const sender = req.user; // Thay vì const senderId = req.user._id

    const areFriends = await ListFriend.findOne({
      $or: [
        { userId: sender._id, friendId: receiverId, status: true },
        { userId: receiverId, friendId: sender._id, status: true },
      ],
    });

    if (!areFriends) {
      return res
        .status(403)
        .json({ message: "You can only message your friends" });
    }
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: sender._id,
      receiverId,
      text,
      image: imageUrl,
      sender: sender, // Thêm thông tin người gửi
    });
    await newMessage.save();
    // todo : realtime functionality goes here => socket
    const reiceiverSocketId = getReceiverSocketId(receiverId);
    if (reiceiverSocketId) {
      io.to(reiceiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
