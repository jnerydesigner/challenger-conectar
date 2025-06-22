import { UserTypes } from "@/types/user.types";
import { api } from "./axios-api";

export const usersFetch = async <T = unknown>(
  page: number,
  limit: number,
  token: string
): Promise<T> => {
  const { data: users } = await api.get<T>(
    `/users?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return users;
};

export const usersCreateFetch = async <T = unknown>({
  name,
  email,
  password,
  role,
  token,
}: UserTypes): Promise<T> => {
  const { data: users } = await api.post<T>(
    "/users",
    {
      name,
      email,
      password,
      role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return users;
};

export const usersUpdateFetch = async <T = unknown>({
  id,
  name,
  email,
  role,
  token,
}: UserTypes): Promise<T> => {
  const { data: users } = await api.patch<T>(
    `/users/${id}`,
    {
      name,
      email,
      role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return users;
};

export const userDeleteFetch = async (
  id: number,
  token: string
): Promise<void> => {
  await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
