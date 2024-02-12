import { AxiosResponse } from "axios";
import { instanceWithToken } from "@/api";

const fetcher = (url: string) =>
  instanceWithToken.get(url).then((response: AxiosResponse) => response.data);

export default fetcher;
