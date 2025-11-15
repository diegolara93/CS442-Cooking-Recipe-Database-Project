"use client";

import { useRouter } from "next/navigation";
import { SignIn } from "@/src/components/SignIn";

type User = {
  id: string;
  displayName: string;
  email: string;
}

export default function Page() {
  const router = useRouter();

  // setUser implementation can go here if we decide to implement it
  const handleSignIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // fetch crsf token
      const csrfRes = await fetch("/api/auth/csrf", {
        credentials: "include",
      });
      if (!csrfRes.ok) {
        console.error("Failed to get CSRF token");
        return false;
      }
      const { csrfToken } = await csrfRes.json();

      // call login endpoint
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({
          username: email,  // backend expects "username"
          password,
        }),
      });

      if (!loginRes.ok) {
        console.error("Login failed with status", loginRes.status);
        return false;
      }

      // fetch userInfo
      const meRes = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (meRes.ok) {
        const meData = await meRes.json();
        const user: User = {
          id: meData.username,
          displayName: meData.username,
          email, // we used email as username for login
        };

        // possible future setUser implementation would go here
        console.log("Logged in as", user);
      }

      // let sign in component know we succeeded
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


