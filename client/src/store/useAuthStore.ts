import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

interface User {
  id: string;
  username: string;
  email: string;
  profilePic?: string;
}

interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: { username: string; email: string; password: string }) => Promise<void>;
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
      const res = await axiosInstance.get("/auth/check");
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
    // Implementation will go here
  },

  updateProfile: async (data) => {
    // Implementation will go here
  },
})); 