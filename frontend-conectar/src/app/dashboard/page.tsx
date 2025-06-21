import { DrawerTriggerClient } from "@/components/drawer-trigger-client";
import UsersTable from "@/components/users-table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  console.log("Token Store", token);

  if (!token) {
    redirect("/login");
  }
  return (
    <>
      <main className="w-full min-h-screen bg-gray-100 py-10 px-4 md:px-12">
        <div className="mx-auto max-w-6xl bg-white shadow-md rounded-xl p-6 space-y-6">
          <DrawerTriggerClient />
          <UsersTable />
        </div>
      </main>
    </>
  );
}
