import { useForm } from "react-hook-form";
import { LoginForm, LoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/mutations/login/useLogin.mutation";

import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const setToken = useAuthStore((state) => state.setToken);
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutate(data, {
      onSuccess: (resp) => {
        navigate({ to: "/dashboard" });
        setToken(resp.access_token);
      },
      onError: (error) => {
        console.warn("[Error] => ", error);
      },
    });
  };

  return { form, onSubmit, isPending };
};
