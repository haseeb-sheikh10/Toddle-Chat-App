import { columns } from "@/components/Friends/Columns";
import { FriendTable } from "@/components/Friends/FriendTable";
import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/lib/helpers/redis";
import { getServerSession } from "next-auth";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async () => {
  const session = await getServerSession(authOptions);

  const friendsID = (await fetchRedis(
    "smembers",
    `user:${session?.user.id}:friends`
  )) as string[];

  const friendsData = await Promise.all(
    friendsID.map(async (id) => {
      const friend = (await fetchRedis("get", `user:${id}`)) as string;
      return JSON.parse(friend) as User;
    })
  );

  return (
    <div className="p-4">
      <div className="text-4xl font-bold text-secondary py-3">
        <h2>My Friends</h2>
      </div>
      <div className=" py-10">
        <FriendTable columns={columns} data={friendsData} />
      </div>
    </div>
  );
};

export default page;
