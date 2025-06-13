import { redirect } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

//protected router for auth user
export const protectedRouter = async () => {
  const store = useAuthStore.getState();

  try {
    // Always check auth first
    await store.checkAuth();
    const user = store.authUser;

    if (!user) {
      throw redirect("/login");
    }

    return null;
  } catch (error) {
    // If checkAuth fails, redirect to login
    throw redirect("/login");
  }
};
