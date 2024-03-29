"use client";

import { FC } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import github from "@/assets/github-icon.svg";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface thirdPartLoginProps {}

const ThirdPartLogin: FC<thirdPartLoginProps> = () => {
  const loginWithGoogle = async () => {
    try {
      toast.promise(signIn("google"), {
        loading: "Redirecting for Signin",
        success: <b>Redirected</b>,
        error: <b>Could Not Redirect</b>,
      });
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };
  const loginWithGithub = async () => {
    try {
      toast.promise(signIn("github"), {
        loading: "Redirecting for Signin",
        success: <b>Redirected</b>,
        error: <b>Could Not Redirect</b>,
      });
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <Button className="w-[80%] text-lg" handleClick={loginWithGoogle}>
        <svg
          className="mr-2 h-6 w-6"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="github"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        SignIn with Google
      </Button>
      <Button
        className="w-[80%] border-2 border-slate-800 text-lg"
        variant="ghost"
        handleClick={loginWithGithub}
      >
        <Image src={github} alt="github icon" className="mr-2 h-6 w-6" />
        SignIn with Github
      </Button>
    </div>
  );
};

export default ThirdPartLogin;
