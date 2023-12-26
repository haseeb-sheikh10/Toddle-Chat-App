"use client";

import avatar from "@/assets/account.svg";
import inlineLogo from "@/assets/inline-logo.png";
import "@/components/Form/input.css";
import { BellRing, Search } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const inboxData = [
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
    {
      name: "haseeb irfan",
      time: "10:12",
      msg: "Hello How are you?",
      image: avatar,
    },
  ];
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="px-44 flex justify-between bg-white shadow-md rounded-b-xl">
          <div className="flex items-center gap-12">
            <div>
              <Image className="w-34" src={inlineLogo} alt="logo" />
            </div>
            <ul className="flex items-center h-full px-24 gap-12 text-lg font-medium">
              <li
                className={`cursor-pointer border-b-4 border-transparent  hover:border-b-primary  h-full flex items-center transition-colors ${
                  pathname.includes("inbox") && "border-b-primary"
                } px-2`}
              >
                Inbox
              </li>
              <li
                className={`cursor-pointer border-b-4 border-transparent  hover:border-b-primary h-full flex items-center transition-colors ${
                  pathname.includes("add-friend") && "border-b-primary"
                } px-2`}
              >
                Add Friend
              </li>
              <li
                className={`cursor-pointer border-b-4 border-transparent  hover:border-b-primary h-full flex items-center transition-colors ${
                  pathname.includes("contacts") && "border-b-primary"
                } px-2`}
              >
                Contacts
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="rounded-full">
                <Image
                  src={avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <h2 className="text-lg font-medium">Haseeb Irfan</h2>
            </div>
            <div className="border-2 border-transparent p-2 rounded-full cursor-pointer boxShadow">
              <BellRing className="" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="min-w-[400px] flex flex-col pt-4">
            <div className="flex flex-col px-4">
              <div className="flex items-center relative leading-7 w-full">
                <Search className="absolute left-4 w-4 h-4 fill-none" />
                <input
                  className="w-full h-11 leading-7 pl-12 pr-4 border-2 border-transparent rounded-xl outline-none bg-white text-[#0d0c22] duration-500 ease-in-out placeholder:text-black hover:outline-none hover:border-primary focus:outline-none focus:border-primary"
                  type="text"
                  placeholder="Search your chats"
                  // value={signInCreds.email}
                  // onChange={(e) =>
                  // dispatch(updateSignInCreds("email", e.target.value))
                  // }
                  autoComplete="off"
                />
              </div>
              <div className="w-[80%] mx-auto border border-slate-200 my-5"></div>
            </div>
            <div className="flex-grow h-[78vh] overflow-y-auto px-4">
              {inboxData.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white p-3 gap-5 rounded-xl mb-2 border-2 border-transparent boxShadow"
                >
                  <div className="rounded-full w-10 h-10">
                    <Image
                      src={data.image}
                      alt="avatar"
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">{data.name}</h3>
                      <p className="text-sm text-gray-500">{data.time}</p>
                    </div>
                    <p className="text-sm text-gray-500">{data.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 pt-4 px-4">
            <div className="bg-white min-h-full rounded-t-xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
