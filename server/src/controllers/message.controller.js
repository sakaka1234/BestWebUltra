import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import ListFriend from "../models/listfriend.model.js";
export const getUserForSidebar = async (req, res) => {
  try {
    const myId = req.user._id;
    // Lấy danh sách bạn bè đã acp
    const friends = await ListFriend.find({
      $or: [
        { userId: myId, status: true },
        { friendId: myId, status: true },
      ],
    });
    //Lấy danh sách ID bạn bè
    const friendIds = friends.map((friend) =>
      friend.userId.equals(myId) ? friend.friendId : friend.userId
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
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
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
