import { create } from "zustand";
import { apiClient } from "../libs";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  createdAt: string;
}

interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: any;
  connectSocket: () => {};
  disconnectSocket: () => {};
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
const BASE_URL = "http://localhost:5001";
export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await apiClient.get("/auth/check");
      set({
        authUser: res.data,
      });
      get().connectSocket();
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({
        authUser: null,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await apiClient.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        toast.error((error.response as any).data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await apiClient.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("some thing went wrong here");
    }
  },
  updateProfile: async (data) => {
    // Implementation will go here
    set({ isUpdatingProfile: true });
    try {
      const res = await apiClient.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error("Something went wrong here");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: async () => {
    try {
      const { authUser } = get();
      if (!authUser) {
        console.error("No auth user found");
        return;
      }

      if (get().socket?.connected) {
        console.log("Socket already connected");
        return;
      }

      const socket = io(BASE_URL, {
        withCredentials: true, // Thêm option này
        transports: ["websocket"], // Chỉ định rõ transport
        query: {
          userId: authUser._id,
        },
        reconnection: true, // Cho phép kết nối lại
        reconnectionAttempts: 5, // Số lần thử kết nối lại
      });

      // Debug listeners
      socket.on("connect", () => {
        console.log("Socket connected with ID:", socket.id);
        set({ socket });
      });

      socket.on("connect_error", (error: any) => {
        console.error("Socket connection error details:", error);
        toast.error("Socket connection failed");
      });

      socket.on("getOnlineUsers", (userIds: string[]) => {
        console.log("Received online users:", userIds);
        set({ onlineUsers: userIds });
      });

      socket.connect();
    } catch (error) {
      console.error("Socket connection error:", error);
      toast.error("Failed to connect to chat server");
    }
  },
  disconnectSocket: async () => {
    try {
      const { socket } = get();
      if (socket) {
        socket.disconnect();
        set({ socket: null });
      }
    } catch (error) {
      toast.error("Error when disconnect socket");
    }
  },
}));
