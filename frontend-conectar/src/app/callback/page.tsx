"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserDataCookie } from "@/types/user-data-cookie";
import { PayloadDecrypted } from "@/types/payload-descripted.type";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const tokenDecoded = async (token: string) => {
      const response = await fetch(`http://localhost:3445/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user: PayloadDecrypted = await response.json();

      const userDataCookie: UserDataCookie = {
        id: user.sub,
        name: user.name,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
        access_token: token,
      };

      await fetch("/api/set-token", {
        method: "POST",
        body: JSON.stringify({ request: userDataCookie }),
      });
      router.push("/dashboard");
    };

    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    console.log(token);

    if (token) {
      tokenDecoded(token);
    }
  }, [router]);

  return <p>Redirecionando...</p>;
}
