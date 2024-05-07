import axios from "axios";

export const loginApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? import.meta.env.VITE_API_DEVELOPMENT
      : import.meta.env.VITE_API_PRODUCTION,
  withCredentials: false,
});

loginApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      `Bearer ${localStorage.getItem("pdv_access_token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

loginApi.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // localStorage.removeItem("access_token");
      // window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
