import { toast } from "react-hot-toast";

// class 합치는 함수
export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

// 알림바 토스트 함수
export const showToast = (msg: string) => {
  toast(`${msg}`, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
