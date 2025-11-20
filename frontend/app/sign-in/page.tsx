"use client";

import { useRouter } from "next/navigation";
import { SignIn } from "@/src/components/SignIn";
import { useApi } from "@/src/lib/apiClient";

type User = {
  id: string;
  displayName: string;
  email: string;
};

export default function Page() {
  const router = useRouter();
  const { apiFetch } = useApi();

  const handleSignIn = async (email: string, password: string): Promise<boolean> => {
    try {

      const loginRes = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      if (!loginRes.ok) {
        console.error("Login failed with status", loginRes.status);
        return false;
      }


      const meRes = await apiFetch("/api/auth/me");
      if (meRes.ok) {
        const meData = await meRes.json();
        const user: User = {
          id: meData.username,
          displayName: meData.username,
          email,
        };


        console.log("Logged in as", user);
      }

      return true;
    } catch (err) {
      console.error("Error during login:", err);
      return false;
    }
  };

  return (
      <SignIn
          onSignIn={handleSignIn}
          onBack={() => router.push("/")}
          onSignUp={() => router.push("/sign-up")}
      />
  );
}
