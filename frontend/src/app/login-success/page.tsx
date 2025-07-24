"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {jwtDecode} from "jwt-decode";

export default function LoginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(decodedUser));
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode JWT", error);
      }

      router.push("/dashboard");
      router.refresh();
    }
  }, [searchParams, router]);

  return (
    <main className="min-h-screen flex justify-center items-center text-lg">
      Logging you in...
    </main>
  );
}