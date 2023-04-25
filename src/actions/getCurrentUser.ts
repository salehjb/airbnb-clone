import prismadb from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth/next";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<User | null> {
    try {
        const session = await getSession();
        if (!session?.user?.email) return null;
        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });
        if (!currentUser) return null;
        return currentUser;
    } catch (error) {
        return null;
    }
}