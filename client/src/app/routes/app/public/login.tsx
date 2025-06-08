import { MessageSquare, Lock, EyeOff, Eye, Mail, Loader2 } from "lucide-react";
import { AuthLayout } from "../../../../components/layouts/auth/auth-layout";
import { useLogin } from "../../../../services/auth/login";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../../../hooks";
export const LoginRouter = () => {
  const login = useLogin();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn reload trang
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    login.mutate({
      email,
      password,
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggingIn } = useAuthStore();

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Nexora will enhance your experience
              </p>
            </div>
          </div>
          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* User */}

            {/* Mail */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 bg-transparent"
                  placeholder="you@example.com"
                  name="email"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 bg-transparent`}
                  placeholder="••••••••"
                  name="password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don't have any account?{" "}
              <Link to="../signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
