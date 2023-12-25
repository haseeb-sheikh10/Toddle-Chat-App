"use client";

import { FC, useEffect } from "react";

interface loginFormProps {}
import "./form.css";
import Image from "next/image";
import atIcon from "@/assets/at-the-rate-icon.svg";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { updateSignInCreds } from "@/app/redux/actions/authAction";

const LoginForm: FC<loginFormProps> = () => {
  const { signInCreds } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <form className="flex flex-col items-center justify-start mt-5 py-5 gap-2 w-full">
      <div className="group w-[75%] md:w-[60%]">
        <Image className="icon" src={atIcon} alt="at the rate" />
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={signInCreds.email}
          onChange={(e) => dispatch(updateSignInCreds("email", e.target.value))}
          autoComplete="off"
        />
      </div>
      <div className="group w-[75%] md:w-[60%]">
        <svg
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={signInCreds?.password}
          onChange={(e) =>
            dispatch(updateSignInCreds("password", e.target.value))
          }
          autoComplete="off"
        />
      </div>
      <Button
        className="mt-12 w-[80%] text-lg bg-[#fe4c40]"
        handleClick={() => {}}
      >
        LOGIN
      </Button>
    </form>
  );
};

export default LoginForm;
