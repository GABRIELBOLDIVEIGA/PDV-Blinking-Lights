import axios, { AxiosError } from "axios";

export const errorHandler = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.message,
      status: error.status,
    };
  } else {
    return {
      message: error.message,
      status: 500,
    };
  }
};
