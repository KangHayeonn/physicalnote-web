import { instanceWithToken } from "@/api";
import { PlayersRequestType } from "@/types/privateData";
const prefix = "/admin";

const PrivateData = {
  async v1GetPlayers(data: PlayersRequestType, page: number, size: number) {
    try {
      const url = `${prefix}/player`;
      const result = await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateImportantPlayer(playerId: number) {
    try {
      const url = `${prefix}/team/important/${playerId}`;
      const result = await instanceWithToken.post(url);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerDetail(
    playerId: number,
    yearMonth: string,
    page: number,
    size: number
  ) {
    try {
      const url = `${prefix}/player/${playerId}/data`;
      const result = await instanceWithToken.get(url, {
        params: { yearMonth, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerHooperIndex(playerId: number) {
    try {
      const url = `${prefix}/player/${playerId}/intensity_hooperIndex`;
      const result = await instanceWithToken.get(url);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default PrivateData;
