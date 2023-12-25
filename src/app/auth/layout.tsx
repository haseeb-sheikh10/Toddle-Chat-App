import Image from "next/image";
import { FC } from "react";
import logo from "@/assets/logo.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="px-10">
        <Image
          className="h-32 w-32 mx-auto md:mx-0"
          src={logo}
          alt="logo"
        ></Image>
      </div>
      <main className="flex min-h-[70vh] flex-col items-center justify-between p-10">
        <div className="w-[100%] md:w-[70%] justify-center shadow-2xl rounded-md flex-1 flex">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
