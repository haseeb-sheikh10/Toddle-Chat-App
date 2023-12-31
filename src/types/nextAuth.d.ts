import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    image: string;
    email: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}
