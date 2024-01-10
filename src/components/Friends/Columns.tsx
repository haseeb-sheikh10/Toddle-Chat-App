"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { removeFriendValidator } from "@/lib/validations/add-friend";
import { ZodError } from "zod";
import toast from "react-hot-toast";

const handleRemoveFriend = async (id: string) => {
  const remove = async (id: string) => {
    try {
      const validatedID = removeFriendValidator.parse({ id });
      const res = await axios.post("http://localhost:3000/api/friends/remove", {
        id: validatedID,
      });

      return res.data.message;
    } catch (error) {
      if (error instanceof ZodError) {
        throw error.issues[0].message;
      }

      if (error instanceof AxiosError) {
        throw error.response?.data?.message;
      }

      throw new Error("POST ERROR! Something went wrong");
    }
  };
  toast.promise(remove(id), {
    loading: "Removing...",
    success: (data) => `${data}`,
    error: (err) => `${err}`,
  });
};

export const columns: ColumnDef<User>[] = [
  {
    id: "images",
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const Friend = row.original;

      return (
        <>
          {Friend.image ? (
            <Image
              src={Friend.image}
              alt="avatar"
              className="rounded-full"
              width="44"
              height="44"
            />
          ) : (
            <UserRound className="" />
          )}
        </>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const Friend = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(Friend.id)}
            >
              Copy Friend ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Start Chat</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleRemoveFriend(Friend.id)}
              className="text-red-500 hover:text-red-500 focus:text-red-500"
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
