import axios, { Method } from "axios";

interface SendApiRequestParams {
  method: Method;
  url: string;
  data?: any;
  params?: Record<string, any>;
  responseType?: any;
}

const axiosInstance = axios.create({
  baseURL: `${process.env.ENV_SERVER_PATH}admin`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${
      typeof window !== "undefined" && localStorage.getItem("token")
    }`,
  },
});

export const sendApiRequest = async ({
  method,
  url,
  data = null,
  params = {},
  responseType = null,
}: SendApiRequestParams) => {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data,
      params,
      responseType,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
