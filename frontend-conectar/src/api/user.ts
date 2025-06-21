import { UserTypes } from "@/types/user.types";
import { api } from "./axios-api";

export const usersFetch = async <T = unknown>(): Promise<T> => {
  const { data: users } = await api.get<T>("/users");
  return users;
};

export const usersCreateFetch = async <T = unknown>({
  name,
  email,
  password,
  role,
}: UserTypes): Promise<T> => {
  const { data: users } = await api.post<T>("/users", {
    name,
    email,
    password,
    role,
  });
  return users;
};
