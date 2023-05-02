import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/ui/EmptyState";
import ListingClient from "../../../components/listings/ListingClient";
import getReservations from "@/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById({ listingId: params.listingId });
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingPage;
