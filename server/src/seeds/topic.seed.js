import mongoose from "mongoose";
import Topic from "../models/topic.model.js";
import dotenv from "dotenv";

dotenv.config();

const topics = [
  { name: "FRIEND_SEEKING" },
  { name: "JOB_SEEKING" },
  { name: "PROJECT_COLLABORATION" },
];

const seedTopics = async () => {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully!");

    // Clear existing topics
    console.log("Clearing existing topics...");
    await Topic.deleteMany({});

    // Insert new topics
    console.log("Inserting new topics...");
    const createdTopics = await Topic.insertMany(topics);

    console.log("Topics seeded successfully:");
    console.table(
      createdTopics.map((topic) => ({
        _id: topic._id.toString(),
        name: topic.name,
      }))
    );
  } catch (error) {
    console.error("Error seeding topics:", error.message);
  } finally {
    // Close MongoDB connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the seed function
seedTopics();
