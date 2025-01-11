"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { shortnerUrl } from "@/utils/handleUrlLink";
import { useTheme } from "next-themes";

type UrlLiType = {
    shortUrlCode: string;
    urlCopied: string;
    handleCopyUrl: (shortUrlCode: string) => void;
}

export function UrlLiItem({ shortUrlCode, urlCopied, handleCopyUrl }: UrlLiType) {
    return (
        <li className="flex items-center justify-between p-2 bg-card rounded-md text-card-foreground border">
            <Link href={`/${shortUrlCode}`} className="text-blue-400" target="_blank">{shortnerUrl(shortUrlCode)}</Link>
            <div className="flex">
                <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => handleCopyUrl(shortUrlCode)}>
                    {urlCopied === shortUrlCode ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                    <span className="sr-only">Copy Url</span>
                </Button>
            </div>
        </li>
    )
}