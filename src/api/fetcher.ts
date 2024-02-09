import { AxiosResponse } from "axios";
import { instance } from "@/api";

const fetcher = (url: string) =>
  instance.get(url).then((response: AxiosResponse) => response.data);

export default fetcher;
