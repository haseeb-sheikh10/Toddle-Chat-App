import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "@/lib/db";
import {
  getGithubCredentials,
  getGoogleCredentials,
} from "./helpers/credentials";
import { fetchRedis } from "./helpers/redis";

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    GithubProvider({
      clientId: getGithubCredentials().clientId,
      clientSecret: getGithubCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = (await fetchRedis("get", `user:${token?.id}`)) as string;

      const parsedUser = JSON.parse(dbUser) as User | null;

      if (!parsedUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: parsedUser.id,
        name: parsedUser.name,
        email: parsedUser.email,
        image: parsedUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }

      return session;
    },

    redirect() {
      return "/dashboard/inbox";
    },
  },
};
