import { AuthLayout } from "../../../../components/layouts/auth/auth-layout";
import { useLogin } from "../../../../services/auth/login";

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

  return (
    <AuthLayout>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="email" name="email" />
        <input type="text" placeholder="password" name="password" />
        <button type="submit">submit</button>
      </form>
    </AuthLayout>
  );
};
