"use client";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ session }: { session: Session | null }) {
  const nav = useRouter();

  useEffect(() => {
    if (session) {
      nav.push("/dashboard");
    } else {
      nav.push("/auth");
    }
  }, [session, nav]);

  return <></>;
}
