import { instanceWithToken } from "@/api";
const prefix = "/admin";

const Dashboard = {
  async v1GetDashboard(recordDate: string) {
    try {
      const url = `${prefix}/dash_bord`;
      const result = await instanceWithToken.get(url, {
        params: { recordDate },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetTeamCaution(recordDate: string, page: number, size: number) {
    try {
      const url = `${prefix}/team_caution`;
      const result = await instanceWithToken.get(url, {
        params: { recordDate, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetTeamInjury(page: number, size: number) {
    try {
      const url = `${prefix}/team_injury`;
      const result = await instanceWithToken.get(url, {
        params: { page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateTeamNote(content: string, recordDate: string) {
    try {
      const url = `${prefix}/note`;
      const result = await instanceWithToken.post(url, { content, recordDate });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Dashboard;
