"use client"

import { FC } from "react";
import Logo from "../ui/Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
 
interface NavbarProps {
  currentUser?: User | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <div className="container">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
