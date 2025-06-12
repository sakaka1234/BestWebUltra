import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["FRIEND_SEEKING", "JOB_SEEKING", "PROJECT_COLLABORATION"],
  },
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
