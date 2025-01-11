"use client"
import { useContext, useState } from "react";
import { UrlLiItem } from "./UrlLiItem";
import { UrlContext } from "@/context/UrlContext/UrlContext";
import { shortnerUrl } from "@/utils/handleUrlLink";

export function ShortnedUrlList() {
    const { urls, loading } = useContext(UrlContext);
    const [urlCopied, setUrlCopied] = useState("");

    const handleCopyUrl = (shortUrlCode: string) => {
        const fullUrl = shortnerUrl(shortUrlCode);
        navigator.clipboard.writeText(fullUrl).then(() => {
            setUrlCopied(shortUrlCode);
            setTimeout(() => {
                setUrlCopied("");
            }, 3000)
        })
    }

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <ul className="space-y-2">
                    {[1, 2, 3].map(n => (
                        <li
                            key={n}
                            className="flex items-center gap-2 rounded-md border bg-card p-4 text-card-foreground justify-between"
                        >
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div></div>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Últimas Urls</h2>
            <ul className="space-y-2">
                {urls && urls.map(url => (
                    <UrlLiItem
                        key={url.id}
                        shortUrlCode={url.shortUrlCode}
                        urlCopied={urlCopied}
                        handleCopyUrl={handleCopyUrl}
                    />
                ))}
            </ul>
        </div>
    )
}