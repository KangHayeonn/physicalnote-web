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
  async v1GetHooperIndexReport(
    data: ReportRequestType,
    page: number,
    size: number
  ) {
    try {
      const url = `${prefix}/graph/hooper_index`;
      const result = await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetBodyFatReport(
    data: ReportRequestType,
    page: number,
    size: number
  ) {
    try {
      const url = `${prefix}/graph/body_fat`;
      const result = await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetWeightReport(data: ReportRequestType, page: number, size: number) {
    try {
      const url = `${prefix}/graph/weight`;
      const result = await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetMuscleSorenessReport(
    data: ReportRequestType,
    page: number,
    size: number
  ) {
    try {
      const url = `${prefix}/graph/muscle_soreness`;
      const result = await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetWorkLoadReport(
    data: ReportRequestType,
    page: number,
    size: number
  ) {
    try {
      const url = `${prefix}/graph/work_load`;
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
