"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/src/lib/apiClient";

type CsrfContextValue = {
    csrfToken: string | null;
};

const CsrfContext = createContext<CsrfContextValue>({ csrfToken: null });

export const CsrfProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState<string | null>(null);
    const { apiFetch } = useApi();

    useEffect(() => {
        const fetchCsrf = async () => {
            try {
                const res = await apiFetch(`/api/auth/csrf`, {
                    credentials: "include",
                });

                if (!res.ok) {
                    console.error("Failed to fetch CSRF token", res.status);
                    return;
                }

                const data = await res.json();
                setCsrfToken(data.csrfToken);
            } catch (err) {
                console.error("Error fetching CSRF token:", err);
            }
        };

        fetchCsrf();
    }, []);

    return (
        <CsrfContext.Provider value={{ csrfToken }}>
            {children}
        </CsrfContext.Provider>
    );
};

export const useCsrf = () => useContext(CsrfContext);
