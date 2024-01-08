"use client";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellRing, UserRound } from "lucide-react";
import Image from "next/image";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface NavActionsProps {
  session: Session | null;
}

const NavActions: FC<NavActionsProps> = ({ session }) => {
  const handleLogout = async () => {
    try {
      toast.promise(signOut(), {
        loading: "Signing Out..",
        success: <b>Success</b>,
        error: <b>There was a problem in signing you out</b>,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center gap-3">
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`focus:outline-none border-2 border-transparent rounded-full cursor-pointer boxShadow ${
              !session?.user.image && "p-2"
            }`}
          >
            {session?.user.image ? (
              <Image
                src={session?.user.image}
                alt="avatar"
                className="rounded-full"
                width="34"
                height="34"
              />
            ) : (
              <UserRound className="" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-xl">
            <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border-2 border-transparent p-2 rounded-full cursor-pointer boxShadow">
        <BellRing className="w-6 h-6" />
      </div>
    </div>
  );
};

export default NavActions;
