export const setUserId = (id: string) => {
  localStorage.setItem("userId", id);
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};

export const setLoginId = (id: string) => {
  localStorage.setItem("loginId", id);
};

export const getLoginId = () => {
  return localStorage.getItem("loginId");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setName = (id: string) => {
  localStorage.setItem("name", id);
};

export const getName = () => {
  return localStorage.getItem("name");
};

export const setRole = (id: string) => {
  localStorage.setItem("role", id);
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const clearToken = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("loginId");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
};
