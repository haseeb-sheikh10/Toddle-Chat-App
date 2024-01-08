import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/helpers/redis";
import { AxiosError } from "axios";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();

    const { id: idToAccept } = z.object({ id: z.string() }).parse(body);

    // check if logged in
    const session = (await getServerSession(authOptions)) as Session | null;
    if (!session) {
      return NextResponse.json(
        { status: false, message: "Unauthorized", data: [] },
        {
          status: 401,
        }
      );
    }

    // check if person exist
    const person = (await fetchRedis("get", `user:${idToAccept}`)) as
      | string
      | null;

    if (!person) {
      return NextResponse.json(
        { status: false, message: "Person Not Found", data: [] },
        {
          status: 404,
        }
      );
    }

    // check if users are not already friend
    const isAlreadyFriend = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAccept
    )) as 0 | 1;

    if (isAlreadyFriend) {
      return NextResponse.json(
        {
          status: false,
          message: "This person is already your friend",
          data: [],
        },
        {
          status: 400,
        }
      );
    }

    //check if you have a friend request from that person

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAccept
    );

    if (!hasFriendRequest) {
      return NextResponse.json(
        {
          status: false,
          message: "You do not have a friend request from this person",
          data: [],
        },
        {
          status: 400,
        }
      );
    }

    await db.sadd(`user:${session.user.id}:friends`, idToAccept);
    await db.sadd(`user:${idToAccept}:friends`, session.user.id);

    await db.srem(
      `user:${session.user.id}:incoming_friend_requests`,
      idToAccept
    );

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

    return NextResponse.json(
      {
        status: true,
        message: "Friend Request Accepted",
        data: {
          requests: incomingRequests,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { name: error.name, message: error.issues[0].message },
        {
          status: 422,
        }
      );
    }

    if (error instanceof AxiosError) {
      console.log(error);
      return NextResponse.json(
        { name: error.name, message: error.message, error: error.stack },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};
