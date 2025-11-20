import "./globals.css";
import React from "react";
import { ClientProviders } from "@/src/components/ClientProviders";


export const metadata = {
  title: "Cooking Recipe Database",
  description: "Refactored to Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ClientProviders>
      {children}
        </ClientProviders>
      </body>
    </html>
  );
}


