import axios from "axios";

const createInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    withCredentials: true,
  });
};

export const instance = createInstance();
