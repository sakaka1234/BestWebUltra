import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../libs/axios";

interface ChatStore {
  messages: any[];
  users: any[];
  selectedUser: any;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({isUsersLoading: true});
    try{
      const res = await axiosInstance.get("/messages/users");
      set({users: res.data});
    }catch(error){
      toast.error("Failed to fetch users");
    }finally{
      set({isUsersLoading: false});
    }
  },
  getMessages: async (userId) => {
    set({isMessagesLoading: true});
    try {
        const res = await axiosInstance.get(`/messages/${userId}`);
        set({messages: res.data});
    } catch (error) {
        toast.error("Failed to fetch messages");
    }finally{
        set({isMessagesLoading: false});
    }
  },
}));
