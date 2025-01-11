"use client"
import { FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UrlContext } from "@/context/UrlContext/UrlContext";
import { nanoid } from "nanoid";

export function ShortnerInput() {
    const { postUrl } = useContext(UrlContext);
    const [inputUrl, setInputUrl] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        await postUrl(inputUrl);
        setLoading(false);
        setInputUrl("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <Input
                    className="h-10"
                    placeholder="Insira sua URL"
                    type="url"
                    required
                    value={inputUrl}
                    onChange={e => setInputUrl(e.target.value)}
                />
                <Button className="w-full p-2" type="submit" disabled={loading}>
                    {loading ? "carregando..." : "Encurte a Url"}
                </Button>
            </div>
        </form>
    )
}