import { instanceWithToken } from "@/api";
const prefix = "/admin";

const InjuryProgress = {
  async v1GetInjuryProgress(year: string) {
    try {
      const url = `${prefix}/injury/graph?year=${year}`;
      const result = await instanceWithToken.get(url);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default InjuryProgress;
