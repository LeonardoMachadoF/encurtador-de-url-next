"use client"
import { UrlType } from "@/types/UrlType";
import { nanoid } from "nanoid";
import { createContext, ReactNode, useEffect, useState } from "react";

type ContextType = {
    urls: UrlType[],
    postUrl(inputUrl: string): Promise<void>,
    loading: boolean;
}

export const UrlContext = createContext<ContextType>({} as ContextType);

export const UrlContextProvider = ({ children }: { children: ReactNode }) => {
    const [urls, setUrls] = useState<UrlType[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrls() {
        try {
            setLoading(true);
            const sessionId = localStorage.getItem('sessionId');
            const response = await fetch(`/api/urls?sessionId=${encodeURIComponent(sessionId || "")}`);
            const data = await response.json();
            setUrls(data.urls);
        } catch (err) {
            console.error("Erro ao buscar as urls", err);
        } finally {
            setLoading(false);
        }
    }

    async function postUrl(inputUrl: string) {
        try {
            const sessionId = localStorage.getItem('sessionId');
            const response = await fetch("/api/short", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: inputUrl, sessionId })
            });
            await response.json();
            fetchUrls();
        } catch (err) {
            console.log({ error: err })
        }
    }

    useEffect(() => {
        fetchUrls();
    }, [])

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) localStorage.setItem('sessionId', nanoid(20));
    })

    return (
        <UrlContext.Provider value={{ urls, postUrl, loading }}>
            {children}
        </UrlContext.Provider>
    )
}