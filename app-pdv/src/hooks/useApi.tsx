import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

export const useApi = () => {
  const resetAuthStore = useAuthStore((store) => store.reset);
  const access_token = useAuthStore((store) => store.access_token);
  const navigate = useNavigate();

  const pdvApi = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_API_DEVELOPMENT
        : import.meta.env.VITE_API_PRODUCTION,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    withCredentials: false,
  });

  pdvApi.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        resetAuthStore();
        navigate({ to: "/login" });
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return { pdvApi };
};
