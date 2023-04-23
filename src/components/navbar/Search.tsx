"use client";

import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="text-sm border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block font-semibold px-6 border-x flex-1 text-center">
          Any Week
        </div>
        <div className="pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <SearchIcon size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
