import { AuthContext } from "@/context/Auth/AuthContext";
import axios from "axios";
import { useContext } from "react";

export const usePdvApi = () => {
  const authContext = useContext(AuthContext);

  const token = localStorage.getItem("pdv_access_token");

  const pdvApi = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_API_DEVELOPMENT
        : import.meta.env.VITE_API_PRODUCTION,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: false,
  });

  pdvApi.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        authContext.singout();
        window.location.href = "/login";
        alert("Usuário não tem autorização para acessar essa URL!");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );

  return { pdvApi };
};
