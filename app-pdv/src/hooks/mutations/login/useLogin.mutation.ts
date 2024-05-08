import { LoginForm } from "@/components/login-form/schema";
import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { pdvApi } = useApi();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (form: LoginForm) => {
      const { data } = await pdvApi.post<{ access_token: string }>(
        "/auth/login",
        form
      );
      return data;
    },
  });

  return { loginMutation, ...loginMutation };
};
