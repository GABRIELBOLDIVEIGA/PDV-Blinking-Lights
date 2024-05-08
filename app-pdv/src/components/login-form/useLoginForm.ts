import { useForm } from "react-hook-form";
import { LoginForm, LoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/mutations/login/useLogin.mutation";

import { useAuthStore } from "@/stores/auth.store";

export const useLoginForm = () => {
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
    console.log("[Form] => ", data);

    mutate(data, {
      onSuccess: (resp) => {
        console.log("[Resp] => ", resp.access_token);
        setToken(resp.access_token);
      },
      onError: (error) => {
        console.log("[Error] => ", error);
      },
    });
  };

  return { form, onSubmit, isPending };
};
