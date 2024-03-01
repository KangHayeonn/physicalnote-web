import { instanceWithToken } from "@/api";
import {
  ApprovePlayerRequestType,
  PlayerChangeRequestType,
} from "@/types/player";
import { PlayersRequestType } from "@/types/privateData";
const prefix = "/admin";

const Player = {
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
  async v1DeletePlayers(userIds: Array<number>) {
    try {
      const url = `${prefix}/player/delete`;
      const result = await instanceWithToken.delete(url, {
        data: {
          userIds,
        },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1ChangePlayerGrade(data: PlayerChangeRequestType) {
    try {
      const url = `${prefix}/player/change/play_grade`;
      const result = await instanceWithToken.put(url, data);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerRequests(page: number, size: number) {
    try {
      const url = `${prefix}/team/request`;
      const result = await instanceWithToken.get(url, {
        params: { page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1ApprovePlayerRequests(data: ApprovePlayerRequestType) {
    try {
      const url = `${prefix}/team/request`;
      const result = await instanceWithToken.post(url, {
        ...data,
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerDetail(playerId: number, recordDate: string) {
    try {
      const url = `${prefix}/player/${playerId}`;
      const result = await instanceWithToken.get(url, {
        params: { recordDate },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Player;
