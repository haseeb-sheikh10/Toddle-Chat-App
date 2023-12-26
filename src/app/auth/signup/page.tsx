import img from "@/assets/signup.jpg";
import SignupForm from "@/components/Form/SignupForm";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <>
      {" "}
      <div className="hidden md:block my-auto rounded-xl">
        <Image src={img} alt="" className="rounded-xl" />
      </div>
      <div className="my-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-slate-800 font-extrabold text-lg lg:text-2xl">
            SIGN UP AND START TODDLING
          </h1>
          <h3>
            or{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              SIGN IN
            </Link>
          </h3>
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default page;
