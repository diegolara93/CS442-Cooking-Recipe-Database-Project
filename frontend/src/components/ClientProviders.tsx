"use client";

import React from "react";
import { CsrfProvider } from "@/src/context/CsrfContext";


export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <CsrfProvider>
            {children}
        </CsrfProvider>
    );
}
