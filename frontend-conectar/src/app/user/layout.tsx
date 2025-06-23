import { Header } from "@/components/header";
import { UserDataCookie } from "@/types/user-data-cookie";
import { cookies } from "next/headers";
import React from "react";

export default async function LayoutUsers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const data = JSON.parse(
    cookieStore.get("user_data")?.value as string
  ) as UserDataCookie;
  return (
    <>
      <Header user={data} titleNamePage="Painel de Detalhes do Usuário" />
      {children}
    </>
  );
}
