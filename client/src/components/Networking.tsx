import NavBar from "../chatpages/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../chatpages/HomePage";
import SignUpPage from "../chatpages/SignUpPage";
import LoginPage from "../chatpages/LoginPage";
import SettingsPage from "../chatpages/SettingsPage";
import ProfilePage from "../chatpages/ProfilePage";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
export const Networking = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          index
          element={authUser ? <HomePage /> : <Navigate to="login" />}
        />
        <Route
          path="signup"
          element={!authUser ? <SignUpPage /> : <Navigate to=".." />}
        />
        <Route
          path="login"
          element={!authUser ? <LoginPage /> : <Navigate to=".." />}
        />
        <Route path="settings" element={<SettingsPage />} />
        <Route
          path="profile"
          element={authUser ? <ProfilePage /> : <Navigate to="login" />}
        />
      </Routes>
    </div>
  );
};
// <div className="absolute inset-0 z-0">
//   <Spline scene="https://prod.spline.design/NiwrewVXf8EJy7hj/scene.splinecode" />
// </div>
