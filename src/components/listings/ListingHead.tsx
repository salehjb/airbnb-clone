"use client"

import Heading from "@/components/ui/Heading";
import HeartButton from "@/components/ui/HeartButton";
import useCountries from "@/hooks/useCountries";
import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
}

const ListingHead: FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
