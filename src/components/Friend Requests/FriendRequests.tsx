"use client";

import { Ban, Check } from "lucide-react";
import Image from "next/image";
import { FC, useEffect } from "react";
import avatar from "@/assets/account.svg";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  handleAcceptRequest,
  handleRejectRequest,
} from "@/app/redux/actions/friendRequestAction";
import { setFriendRequests } from "@/app/redux/slices/friendRequestSlice";
import NoRequestIcon from "@/assets/no-talking.png";

interface FriendRequestsProps {
  incomingRequests: User[];
  sessionID: string | undefined;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingRequests,
  sessionID,
}) => {
  const dispatch = useAppDispatch();

  const { friendRequests } = useAppSelector((state) => state.friendRequest);

  useEffect(() => {
    dispatch(setFriendRequests(incomingRequests));
  }, []);

  return (
    <>
      <div
        className={`flex-grow ${
          friendRequests.length === 0 && "flex items-center justify-center"
        }`}
      >
        {friendRequests.length > 0 ? (
          friendRequests?.map((request, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-3 gap-5 mb-1 mt-1 border-l-4 border-l-secondary shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full">
                  <Image
                    src={request?.image}
                    alt={request?.name}
                    className="rounded-full"
                    width="40"
                    height="40"
                  />
                </div>
                <div>
                  <h3 className="text-md font-medium">{request.name}</h3>
                  <p className="text-xs text-gray-500">{request.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span
                  onClick={() => dispatch(handleAcceptRequest(request.id))}
                  className="flex items-center justify-center hover:shadow-lg rounded-full w-8 h-8 hover:bg-green-500 hover:text-white cursor-pointer transition-all"
                >
                  <Check className="" />
                </span>
                <span
                  onClick={() => dispatch(handleRejectRequest(request.id))}
                  className="flex items-center justify-center hover:shadow-lg rounded-full w-8 h-8 hover:bg-primary hover:text-white cursor-pointer transition-all"
                >
                  <Ban className="" />
                </span>
              </div>
            </div>
          ))
        ) : (
          <Image
            src={NoRequestIcon}
            alt="NoRequestIcon"
            className="w-56 opacity-50"
          />
        )}
      </div>
    </>
  );
};

export default FriendRequests;
