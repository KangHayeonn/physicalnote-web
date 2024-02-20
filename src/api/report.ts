import { instanceWithToken } from "@/api";
import { ReportRequestType } from "@/types/report";
const prefix = "/admin";

const Report = {
  async v1GetDailyReport(data: ReportRequestType, page: number, size: number) {
    try {
      const url = `${prefix}/report/daily`;
      const result = await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetWeeklyReport(data: ReportRequestType, page: number, size: number) {
    try {
      const url = `${prefix}/report/weekly`;
      const result = await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Report;
