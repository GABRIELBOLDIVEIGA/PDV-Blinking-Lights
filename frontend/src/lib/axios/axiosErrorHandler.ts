import axios, { AxiosError } from "axios";
import { StatusResponse } from "./statusResponse";

export const errorHandler = (
  error: Error | AxiosError,
): StatusResponse | undefined => {
  if (axios.isAxiosError(error)) {
    return {
      error: error.message,
      message: error.response?.data.message,
      status: error.response?.status,
    };
  }
};
