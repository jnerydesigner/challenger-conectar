"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

interface GoogleTokenHandlerProps {
  onDone: () => void;
}

export default function GoogleTokenHandler({
  onDone,
}: GoogleTokenHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setCookie("access_token", token, {
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      router.replace("/dashboard");
    } else {
      onDone();
    }
  }, [searchParams, router, onDone]);

  return null;
}
