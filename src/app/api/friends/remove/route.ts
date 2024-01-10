import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/helpers/redis";
import { removeFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();

    const { id: idToRemove } = removeFriendValidator.parse(body.id);

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
    const person = (await fetchRedis("get", `user:${idToRemove}`)) as
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

    // check if person is your friend
    const isFriend = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToRemove
    )) as 0 | 1;

    if (!isFriend) {
      return NextResponse.json(
        {
          status: false,
          message: "This person is not your friend",
          data: [],
        },
        {
          status: 400,
        }
      );
    }

    //valid request
    await db.srem(`user:${session.user.id}:friends`, idToRemove);
    await db.srem(`user:${idToRemove}:friends`, session.user.id);

    return NextResponse.json(
      {
        status: true,
        message: "Removed!",
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
