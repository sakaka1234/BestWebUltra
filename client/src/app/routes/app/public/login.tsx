import { AuthLayout } from "../../../../components/layouts/auth/auth-layout";
import { useLogin } from "../../../../services/auth/login";

export const LoginRouter = () => {
  const login = useLogin();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <div>
        login
      </div>
    </AuthLayout>
  )
};
