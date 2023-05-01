import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import EmptyState from "@/components/ui/EmptyState";
import { Listing } from "@prisma/client";

const HomePage = async () => {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  return (
    <div className="container">
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: Listing) => (
          <ListingCard key={listing.id} listing={listing} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
