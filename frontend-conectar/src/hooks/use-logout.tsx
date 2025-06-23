"use client";

import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  return async () => {
    await fetch("/api/logout", { method: "GET" });
    router.replace("/login");
  };
};
