"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavMenuProps {}

const NavMenu: FC<NavMenuProps> = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center h-full px-24 gap-12 text-lg font-medium">
      <Link
        href="/dashboard/inbox"
        className={`cursor-pointer border-b-4 border-transparent  hover:border-b-primary  h-full flex items-center transition-colors ${
          pathname.includes("inbox") && "border-b-primary"
        } px-2`}
      >
        Inbox
      </Link>
      <Link
        href="/dashboard/add-friend"
        className={`cursor-pointer border-b-4 border-transparent  hover:border-b-primary h-full flex items-center transition-colors ${
          pathname.includes("add-friend") && "border-b-primary"
        } px-2`}
      >
        Add Friend
      </Link>
      <Link
        href="/dashboard/contacts"
        className={`cursor-pointer border-b-4 border-transparent  hover:border-b-primary h-full flex items-center transition-colors ${
          pathname.includes("contacts") && "border-b-primary"
        } px-2`}
      >
        Contacts
      </Link>
    </div>
  );
};

export default NavMenu;
