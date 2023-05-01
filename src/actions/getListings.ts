import prismadb from '@/libs/prismadb';

export default async function getListings() {
    try {
        const listings = await prismadb.listing.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return listings;
    } catch (error: any) {
        throw new Error(error)
    }
}