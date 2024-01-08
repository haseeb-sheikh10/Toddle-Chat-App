import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/helpers/redis";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    // get id from redis
    const idToAdd = (await fetchRedis("get", `user:email:${emailToAdd}`)) as
      | string
      | null;

    //check if person exist
    if (!idToAdd) {
      return NextResponse.json(
        { status: false, message: "Person Not Found", data: [] },
        {
          status: 404,
        }
      );
    }

    // get current session
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session) {
      return NextResponse.json(
        { status: false, message: "Unauthorized", data: [] },
        {
          status: 401,
        }
      );
    }

    // check if id matches your id
    if (idToAdd === session?.user.id) {
      return NextResponse.json(
        { status: false, message: "You can not add yourself", data: [] },
        {
          status: 400,
        }
      );
    }

    // check if person with id is already has a friend request from you
    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session?.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return NextResponse.json(
        {
          status: false,
          message: "You already sent a request to this person",
          data: [],
        },
        {
          status: 400,
        }
      );
    }

    // check if person with id already sent you a request
    const isAlreadyARequestFromThisPerson = (await fetchRedis(
      "sismember",
      `user:${session?.user?.id}:incoming_friend_requests`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyARequestFromThisPerson) {
      return NextResponse.json(
        {
          status: false,
          message: "You already have a request from this person",
          data: [],
        },
        {
          status: 400,
        }
      );
    }

    // check if person with id is already your friend
    const isAlreadyFriend = (await fetchRedis(
      "sismember",
      `user:${session?.user?.id}:friends`,
      idToAdd
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

    //valid request
    await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

    return NextResponse.json(
      {
        status: true,
        message: "Friend Request Sent!",
        data: [],
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
