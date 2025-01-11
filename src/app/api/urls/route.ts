import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        let sessionId = url.searchParams.get('sessionId');

        const urls = await prisma.url.findMany({
            where: {
                sessionId: sessionId as string
            },
            orderBy: { createdAt: "desc" },
            take: 5
        });

        return NextResponse.json({ urls, sessionId });
    } catch (err) {
        console.log("fetch url error", err);
        return NextResponse.json({ error: "Ocorreu algum erro ao resgatar as urls" });
    }
}