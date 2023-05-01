import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from '@/libs/prismadb';

interface IParams {
    listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("invalid id");
    }

    let favoritesIds = [...(currentUser.favoritesIds || [])];

    favoritesIds.push(listingId);

    const user = await prismadb.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoritesIds
        }
    })

    return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("invalid id");
    }

    let favoritesIds = [...(currentUser.favoritesIds || [])];

    favoritesIds = favoritesIds.filter((id) => id !== listingId);

    const user = await prismadb.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoritesIds
        }
    })

    return NextResponse.json(user);
}