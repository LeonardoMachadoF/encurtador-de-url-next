import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { url, sessionId } = await request.json();

        const shortnedUrl = await prisma.url.create({
            data: {
                originalUrl: url,
                shortUrlCode: nanoid(8),
                sessionId: sessionId
            }
        });

        return NextResponse.json({ shortUrlCode: shortnedUrl.shortUrlCode });
    } catch (err) {
        console.log("fetch url error", err);
        return NextResponse.json({ error: "Ocorreu algum erro ao resgatar as urls" });
    }
}
