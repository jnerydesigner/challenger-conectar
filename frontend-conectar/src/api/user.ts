import { UserTypes } from "@/types/user.types";
import { api } from "./axios-api";

export const usersFetch = async <T = unknown>(
  page: number,
  limit: number,
  token: string,
  role: string,
  field: string,
  direction: string
): Promise<T> => {
  let url = `/users?page=${page}&limit=${limit}`;

  console.log("Url do axios", url);
  if (role !== "") {
    url = url + `&role=${role}`;
  }
  if (field) {
    url = url + `&field=${field}`;
  }
  if (direction) {
    url = url + `&direction=${direction}`;
  }

  console.log("Formando a url", url);

  const { data: users } = await api.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  token,
}: UserTypes): Promise<T> => {
  const { data: users } = await api.patch<T>(
    `/users/${id}`,
    {
      name,
      email,
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
