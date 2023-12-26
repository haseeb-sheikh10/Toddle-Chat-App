"use client";

import { FC, useEffect } from "react";

interface signupFormProps {}
import Image from "next/image";
import atIcon from "@/assets/at-the-rate-icon.svg";
import accountIcon from "@/assets/account.svg";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  handleConfirmPass,
  updateSignUpCreds,
} from "@/app/redux/actions/authAction";
import "./input.css";

const SignupForm: FC<signupFormProps> = () => {
  const { signUpCreds } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <form className="flex flex-col items-center justify-start mt-5 py-5 gap-2 w-full">
      <div className="group w-[75%] md:w-[60%]">
        <Image
          className="absolute fill-none left-4 w-5 h-5"
          src={accountIcon}
          alt="account"
        />
        <input
          className="input"
          type="text"
          placeholder="Full Name"
          value={signUpCreds.name}
          onChange={(e) => dispatch(updateSignUpCreds("name", e.target.value))}
          autoComplete="off"
        />
      </div>

      <div className="group w-[75%] md:w-[60%]">
        <Image className="icon" src={atIcon} alt="at the rate" />
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={signUpCreds.email}
          onChange={(e) => dispatch(updateSignUpCreds("email", e.target.value))}
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
          value={signUpCreds?.password}
          onChange={(e) =>
            dispatch(updateSignUpCreds("password", e.target.value))
          }
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
          placeholder="Confirm Password"
          // value={signUpCreds?.password}
          onChange={(e) => dispatch(handleConfirmPass(e.target.value))}
          autoComplete="off"
        />
      </div>
      <Button
        className="mt-12 w-[80%] text-lg bg-primary"
        handleClick={() => {}}
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;
