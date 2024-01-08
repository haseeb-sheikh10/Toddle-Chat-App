import { FC } from "react";

import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/lib/helpers/redis";
import { getServerSession } from "next-auth";
import Image from "next/image";
import FriendRequests from "./FriendRequests";

interface RequestSidebarProps {}

const RequestSidebar: FC<RequestSidebarProps> = async () => {
  const session = await getServerSession(authOptions);

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session?.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingRequests = await Promise.all(
    incomingSenderIds.map(async (senderID) => {
      const sender = (await fetchRedis("get", `user:${senderID}`)) as string;
      return JSON.parse(sender) as User;
    })
  );

  return (
    <>
      <div className="pt-4 pr-4">
        <div className="bg-white min-h-full w-[380px] rounded-t-xl flex flex-col gap-2 p-4">
          <div className="flex items-center gap-1">
            <div className="w-10 h-1 bg-secondary"></div>
            <h1 className="text-xl font-bold">Friend Requests</h1>
          </div>

          <FriendRequests
            sessionID={session?.user.id}
            incomingRequests={incomingRequests}
          />
        </div>
      </div>
    </>
  );
};

export default RequestSidebar;
