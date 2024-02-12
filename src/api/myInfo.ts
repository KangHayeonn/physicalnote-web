import { instanceWithToken } from "@/api";
import { ChangePasswordRequestType } from "@/types/myInfo";
const prefix = "/admin";

const MyInfo = {
  async v1ConfirmPassword(password: string) {
    try {
      const url = `${prefix}/password/check`;
      const result = await instanceWithToken.post(url, { password: password });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1ChangePassword(data: ChangePasswordRequestType) {
    try {
      const url = `${prefix}/password/change`;
      const result = await instanceWithToken.post(url, {
        changePassword1: data.changePW,
        changePassword2: data.reChangePW,
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default MyInfo;
