import { DrawerTriggerClient } from "@/components/drawer-trigger-client";
import { Header } from "@/components/header";
import UsersTable from "@/components/users-table";
import { UserDataCookie } from "@/types/user-data-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = await cookies();
  console.log(cookieStore);
  const isValidCookie = cookieStore.get("user_data");

  if (!isValidCookie) {
    redirect("/login");
  }

  const data = JSON.parse(
    cookieStore.get("user_data")?.value as string
  ) as UserDataCookie;

  console.log(data);

  if (!data.access_token) {
    console.log("!data.access_token", data);
    redirect("/login");
  } else if (data.role === "user") {
    console.log("data.role === user", data);
    redirect("/");
  }
  return (
    <>
      <Header user={data} titleNamePage="Painel de Usuários" />
      <main className="w-full min-h-screen bg-gray-100 py-10 px-4 md:px-12">
        <div className="mx-auto max-w-6xl bg-white shadow-md rounded-xl p-6 space-y-6">
          <div>
            <DrawerTriggerClient />
          </div>
          <UsersTable token={data.access_token} />
        </div>
      </main>
    </>
  );
}
