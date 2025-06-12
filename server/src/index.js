import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import postRoutes from "./routes/post.route.js";
import friendRoutes from "./routes/friend.route.js";
dotenv.config();

const PORT = process.env.PORT;
const CLIENT_URL = "http://localhost:3000";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/friends", friendRoutes);

server.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
  connectDB();
});
