import { create } from "zustand";
import { apiClient } from "../libs";
import { toast } from "react-hot-toast";

interface Post {
  _id: string;
  title?: string;
  content: string;
  imageURL?: string;
  topicId: string;
  createdAt: string;
  author: {
    _id: string;
    name: string;
    profilePic: string;
  };
  comments: Comment[];
}

interface Comment {
  _id: string;
  content: string;
  commenter: {
    _id: string;
    name: string;
    profilePic: string;
  };
  createdAt: string;
}

interface CreatePostData {
  title?: string;
  content: string;
  image?: string;
  topicId: string;
}

interface PostStore {
  posts: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  isCreatingPost: boolean;
  error: string | null;

  // Actions
  createPost: (data: CreatePostData) => Promise<void>;
  getPosts: () => Promise<void>;
  getPostById: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  clearError: () => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  selectedPost: null,
  isLoading: false,
  isCreatingPost: false,
  error: null,

  createPost: async (data: CreatePostData) => {
    set({ isCreatingPost: true, error: null });
    try {
      const res = await apiClient.post("/posts/create", {
        title: data.title,
        content: data.content,
        topicId: data.topicId,
        image: data.image,
      });

      set((state) => ({
        posts: [res.data, ...state.posts],
      }));
      toast.success("Post created successfully");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create post";
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isCreatingPost: false });
    }
  },

  getPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiClient.get("/posts");
      set({ posts: res.data });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch posts";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  getPostById: async (postId: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiClient.get(`/posts/${postId}`);
      set({ selectedPost: res.data });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch post";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  deletePost: async (postId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.delete(`/posts/${postId}`);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
      }));
      toast.success("Post deleted successfully");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete post";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  addComment: async (postId: string, content: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiClient.post(`/posts/${postId}/comment`, { content });

      set((state) => ({
        posts: state.posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, res.data],
            };
          }
          return post;
        }),
        selectedPost:
          state.selectedPost && state.selectedPost._id === postId
            ? {
                ...state.selectedPost,
                comments: [...state.selectedPost.comments, res.data],
              }
            : state.selectedPost,
      }));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add comment";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
