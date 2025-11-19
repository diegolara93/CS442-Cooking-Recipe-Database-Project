"use client";

import { useRouter } from "next/navigation";
import { SignUp } from "@/src/components/SignUp";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (
      displayName: string,
      email: string,
      password: string
  ): Promise<boolean> => {
    try {

      const params = new URLSearchParams({
        username: displayName, // use displayName as username
        email,
        password,
      });

      const res = await fetch(
          `http://localhost:8080/api/user/create?${params.toString()}`,
          {
            method: "POST",

          }
      );

      if (!res.ok) {
        console.error("Sign-up failed with status", res.status);
        return false;
      }

      const text = await res.text();
      if (text !== "User created") {
        console.error("Unexpected response:", text);
        return false;
      }

      // send to sign in if success
      router.push("/sign-in");
      return true;
    } catch (err) {
      console.error("Error during sign-up:", err);
      return false;
    }
  };

  return (
      <SignUp
          onSignUp={handleSignUp}
          onSignIn={() => router.push("/sign-in")}
          onBack={() => router.push("/")}
      />
  );
}
