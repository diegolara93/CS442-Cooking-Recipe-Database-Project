import "./globals.css";
import React from "react";
import { ClientProviders } from "@/src/components/ClientProviders";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


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
          <ToastContainer position="top-right" autoClose={3000} />
        </ClientProviders>
      </body>
    </html>
  );
}


