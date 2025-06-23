import { Suspense } from "react";
import ClientLogin from "./client-login";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientLogin />
    </Suspense>
  );
}
