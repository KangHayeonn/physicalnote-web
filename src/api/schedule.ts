import { instanceWithToken } from "@/api";
const prefix = "/admin";
import { CategoryType, ScheduleRequestType } from "@/types/schedule";

const Schedule = {
  async v1GetSchedule(playerGrade: string, recordMonth: string) {
    try {
      const url = `${prefix}/calendar`;
      const result = await instanceWithToken.get(url, {
        params: { playerGrade, recordMonth },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetCategoryList() {
    try {
      const url = `${prefix}/calendar_category`;
      const result = await instanceWithToken.get(url);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetCategoryColor() {
    try {
      const url = `${prefix}/calendar_category/color`;
      const result = await instanceWithToken.get(url);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetScheduleDaily(
    playerGrade: string,
    recordMonth: string,
    page: number,
    size: number
  ) {
    try {
      const url = `${prefix}/calendar/daily`;
      const result = await instanceWithToken.get(url, {
        params: { playerGrade, recordMonth, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetImportantSchedule(
    playerGrade: string,
    recordMonth: string,
    page: number,
    size: number
  ) {
    try {
      const url = `${prefix}/calendar/monthly`;
      const result = await instanceWithToken.get(url, {
        params: { playerGrade, recordMonth, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerList(playerGrade: string, page: number, size: number) {
    try {
      const url = `${prefix}/player/list/simple`;
      const result = await instanceWithToken.get(url, {
        params: { playerGrade, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1AddCategory(category: CategoryType) {
    try {
      const url = `${prefix}/calendar_category`;
      const result = await instanceWithToken.post(url, { ...category });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1AddSchedule(schedule: ScheduleRequestType) {
    try {
      const url = `${prefix}/workout_calendar`;
      const result = await instanceWithToken.post(url, { ...schedule });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateImportantSchedule(scheduleId: number) {
    try {
      const url = `${prefix}/workout_calendar/${scheduleId}/important`;
      const result = await instanceWithToken.post(url);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateSchedule(id: number, schedule: ScheduleRequestType) {
    try {
      const url = `${prefix}/workout_calendar/${id}`;
      const result = await instanceWithToken.put(url, { ...schedule });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1DeleteCategory(categoryId: number) {
    try {
      const url = `${prefix}/calendar_category/${categoryId}`;
      const result = await instanceWithToken.delete(url);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1DeleteSchedule(scheduleId: number) {
    try {
      const url = `${prefix}/workout_calendar/${scheduleId}`;
      const result = await instanceWithToken.delete(url);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Schedule;
