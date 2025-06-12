import mongoose, { Mongoose } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    imageURL: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Post = new mongoose.model("Post", postSchema);
export default Post;
