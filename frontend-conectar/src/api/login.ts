import { api } from "./axios-api";

export const loginFetch = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  console.log("loginFetch", response);

  return response.data;
};
