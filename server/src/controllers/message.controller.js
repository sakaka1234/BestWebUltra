import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import ListFriend from "../models/listfriend.model.js";
export const getUserForSidebar = async (req, res) => {
  try {
    const currentUser = req.user;

    // Get all users except current user
    const users = await User.find({
      _id: { $ne: currentUser._id },
    })
      .select("-password") // Exclude password
      .sort({ fullName: 1 }); // Sort by name alphabetically

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUserForSidebar:", error);
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

    // Create new message without checking friendship
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image,
    });

    await newMessage.save();

    // Emit socket event
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
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
