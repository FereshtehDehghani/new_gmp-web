"use client";

import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { accessToken } = useAuth();

  useEffect(() => {
    console.log("router", router);
    console.log("accessToken",accessToken)

    if (!router) return;

    if (accessToken) {
      router?.push("/dashboard");
    } else {
      router?.push("/auth-user");
    }
  }, [accessToken, router]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <p>Redirecting...</p>
    </div>
  );
}
