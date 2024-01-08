import logo from "@/assets/inline-logo.png";
import Image from "next/image";
import { FC } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="px-44 bg-white shadow-md rounded-b-xl">
        <Image className="w-34 mx-auto md:mx-0" src={logo} alt="logo"></Image>
      </div>
      <main className="flex min-h-[90vh] flex-col items-center justify-center p-10">
        <div className="w-[100%] md:w-[70%] justify-center shadow-2xl rounded-xl flex bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
