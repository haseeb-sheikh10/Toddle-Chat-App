"use client";

import avatar from "@/assets/account.svg";
import inlineLogo from "@/assets/inline-logo.png";
import "@/components/Form/input.css";
import { BellRing, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { inboxData } from "./(inbox)/data";
import Sidebar from "@/components/Sidebar";
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="px-44 flex justify-between bg-white shadow-md rounded-b-xl">
          <div className="flex items-center gap-12">
            <div>
              <Image className="w-34" src={inlineLogo} alt="logo" />
            </div>
            <ul className="flex items-center h-full px-24 gap-12 text-lg font-medium">
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
            </ul>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="rounded-full">
                <Image
                  src={avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <h2 className="text-lg font-medium">Haseeb Irfan</h2>
            </div>
            <div className="border-2 border-transparent p-2 rounded-full cursor-pointer boxShadow">
              <BellRing className="" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-between">
          <Sidebar />
          <div className="flex-grow pt-4 px-4">
            <div className="bg-white min-h-full rounded-t-xl">{children}</div>
          </div>
          <div className="pt-4 pr-4">
            <div className="bg-white min-h-full min-w-[300px] rounded-t-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
