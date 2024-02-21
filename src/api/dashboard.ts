import { instanceWithToken } from "@/api";
const prefix = "/admin";

const Dashboard = {
  async v1GetPlayers(recordDate: string, page: number, size: number) {
    try {
      const url = `${prefix}/dash_board`;
      const result = await instanceWithToken.get(url, {
        params: { recordDate, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Dashboard;
