"use client";

import { LandingPage } from "@/src/components/LandingPage";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <LandingPage
      onSignIn={() => router.push("/sign-in")}
      onSignUp={() => router.push("/sign-up")}
      onBrowseGuest={() => router.push("/browse")}
    />
  );
}


