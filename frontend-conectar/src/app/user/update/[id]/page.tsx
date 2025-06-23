import { AvatarUser } from "@/components/avatar-user";
import { UserDataCookie } from "@/types/user-data-cookie";
import { UserTypes } from "@/types/user.types";

import { cookies } from "next/headers";
import React from "react";

interface Props {
  params: { id: string };
}

export default async function UpdateUserPage({ params }: Props) {
  const cookieStore = await cookies();
  const data = JSON.parse(
    cookieStore.get("user_data")?.value as string
  ) as UserDataCookie;

  const { id } = await params;
  const response = await fetch(`http://localhost:3445/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
    cache: "no-store",
  });

  const user: UserTypes = await response.json();

  return (
    <main className="min-h-screen w-full bg-gray-100 py-10 px-4 md:px-12">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
        <div className="w-full h-20 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Detalhes do Usuário
          </h1>
          <AvatarUser user={data} className="w-10 h-10" />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">ID</span>
            <span className="text-lg font-medium text-gray-800">{user.id}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Nome</span>
            <span className="text-lg font-medium text-gray-800">
              {user.name}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">E-mail</span>
            <span className="text-lg font-medium text-gray-800">
              {user.email}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Cargo</span>
            <span className="text-lg font-medium text-gray-800 capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
