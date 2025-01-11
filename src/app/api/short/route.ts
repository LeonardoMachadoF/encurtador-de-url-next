import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { url, sessionId } = await request.json();

    const shortnedUrl = await prisma.url.create({
        data: {
            originalUrl: url,
            shortUrlCode: nanoid(8),
            sessionId: sessionId
        }
    });

    return NextResponse.json({ shortUrlCode: shortnedUrl.shortUrlCode });
}
