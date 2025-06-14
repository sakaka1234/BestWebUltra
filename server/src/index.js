import express from "express";
import dotenv from "dotenv";
import "./models/topic.model.js";
import "./models/post.model.js";
import "./models/comment.model.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import postRoutes from "./routes/post.route.js";
import friendRoutes from "./routes/friend.route.js";
import path from "path";
dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();
const CLIENT_URL = "http://localhost:3000";
// http://localhost:3000
// https://best-web-ultra-qi2q.vercel.app
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}
server.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
  connectDB();
});
