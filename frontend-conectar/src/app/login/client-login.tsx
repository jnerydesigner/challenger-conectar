"use client";
import GoogleTokenHandler from "@/components/google-token-handler";
import { LoginForm } from "@/components/login-form";
import { useState } from "react";

export default function LoginPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {!showForm ? (
          <GoogleTokenHandler onDone={() => setShowForm(true)} />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
