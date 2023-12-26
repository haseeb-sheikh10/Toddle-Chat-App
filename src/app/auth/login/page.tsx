"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import { FC } from "react";
import img from "@/assets/login.jpg";
import Link from "next/link";
import LoginForm from "@/components/Form/LoginForm";
import ThirdPartLogin from "@/components/ThirdPartyLogin";

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <>
      <div className="my-auto">
        <ThirdPartLogin />
        <div className="w-[50%] mx-auto border border-slate-200 my-5"></div>
        <div className="flex flex-col items-center">
          <h1 className="text-slate-800 font-extrabold text-lg lg:text-2xl">
            SIGN IN AND START TODDLING
          </h1>
          <h3>
            or{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              SIGN UP
            </Link>
          </h3>
          <LoginForm />
        </div>
      </div>
      <div className="hidden md:block my-auto rounded-xl">
        <Image src={img} alt="" className="rounded-xl" />
      </div>
    </>
  );
};

export default page;
