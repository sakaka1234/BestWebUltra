import { redirect } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

//protected router for auth user
export const protectedRouter = async () => {
  const store = useAuthStore.getState();
  let user = store.authUser;
  if (user == null) {
    user = await store.checkAuth();
  }
  if (!user) {
    throw redirect("/login");
  }
  return null;
}
