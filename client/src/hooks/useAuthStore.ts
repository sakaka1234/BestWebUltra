import { create } from "zustand";
import { apiClient } from "../libs";
import toast from "react-hot-toast";
interface User {
  id: string;
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
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await apiClient.get("/auth/check");
      set({
        authUser: res.data,
      });
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
}));
