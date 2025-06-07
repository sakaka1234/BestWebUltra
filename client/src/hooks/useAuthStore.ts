import { create } from "zustand";
import { apiClient } from "../libs/api-client";

interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<any>;
  signup: (data: unknown) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
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
      return res.data;
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({
        authUser: null,
      });
      return null;
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },
  signup: async (_data) => {

  },
}));
