import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../libs/api-client";
import { ResponseMessage } from "../../types/common";
import { z } from "zod";

export const loginInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(6, "Required"),
});

const postLoginData = (data: z.infer<typeof loginInputSchema>) => {
  return apiClient.post("/auth/login", data);
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLoginData,
    onSuccess: () => {
      navigate("/homechat");
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ResponseMessage;
      console.log("Login failed:", data.message);
    },
  });
};
