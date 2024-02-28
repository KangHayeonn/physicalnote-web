import { instanceWithToken } from "@/api";
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
};

export default Player;
