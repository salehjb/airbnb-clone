"use client";

import { MenuIcon } from "lucide-react";
import Avatar from "../ui/Avatar";
import { FC, useCallback, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useOnClickOutside(userMenuRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={userMenuRef}>
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semi-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <MenuIcon size={20} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {}}
                >
                  My trips
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                >
                  My favorites
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                >
                  My reservations
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                >
                  My properties
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                >
                  Airbnb my home
                </MenuItem>
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    loginModal.onOpen();
                  }}
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    registerModal.onOpen();
                  }}
                >
                  Sign up
                </MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
