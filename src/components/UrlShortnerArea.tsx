"use client"
import { ShortnedUrlList } from "./ShortnedUrlList";
import { ShortnerInput } from "./ShortnerInput";
import { UrlContextProvider } from "@/context/UrlContext/UrlContext";

export function UrlShortnerArea() {
    return (
        <UrlContextProvider>
            <div className="space-y-4">
                <ShortnerInput />
                <ShortnedUrlList />
            </div>
        </UrlContextProvider>
    )
}