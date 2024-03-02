import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { getAccessToken } from "@/utils/tokenControl";
import { showToast } from "@/utils";

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();

      if (token) {
        config.headers["Authorization"] = `bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError | Error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError | Error) => {
      const { response }: any = error;

      if (response.status === 500) {
        // showToast("서버 장애가 발생하였습니다.");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
