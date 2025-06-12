import mongoose from "mongoose";

const listfriendSchema = new mongoose.Schema(
  {
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const ListFriend = mongoose.model("ListFriend", listfriendSchema);

export default ListFriend;
