import prisma from "@/lib/db";
import { redirect } from "next/navigation";


export default async function RedirectPage({ params }: any) {
    const { shortcode } = params;

    const url = await prisma.url.findUnique({
        where: { shortUrlCode: shortcode }
    });

    if (!url) {
        return <div>404 - URL não encontrada</div>
    }
    await prisma.url.update({
        where: { id: url.id },
        data: { visits: { increment: 1 } }
    })
    redirect(url.originalUrl);
}
