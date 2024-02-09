import { instance } from "@/api";
import { LoginRequestType } from "@/types/login";
const prefix = "/admin";

const Auth = {
  async v1Login(data: LoginRequestType) {
    try {
      const url = `/login${prefix}`;
      const result = await instance.post(url, data);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Auth;
