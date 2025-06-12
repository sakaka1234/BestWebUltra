import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
