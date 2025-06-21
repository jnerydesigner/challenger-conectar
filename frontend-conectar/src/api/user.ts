import { UserTypes } from "@/types/user.types";
import { api } from "./axios-api";

export const usersFetch = async <T = unknown>(
  page: number,
  limit: number
): Promise<T> => {
  const { data: users } = await api.get<T>(
    `/users?page=${page}&limit=${limit}`
  );
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

export const userDeleteFetch = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
