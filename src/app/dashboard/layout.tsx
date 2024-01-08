import inlineLogo from "@/assets/inline-logo.png";
import Sidebar from "@/components/Chats/Sidebar";
import "@/components/Form/input.css";
import RequestSidebar from "@/components/Friend Requests/Sidebar";

import Image from "next/image";
import { FC, ReactNode } from "react";

import NavActions from "@/components/Navbar/NavActions";
import NavMenu from "@/components/Navbar/NavMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="px-44 flex justify-between bg-white shadow-md rounded-b-xl">
          <div className="flex items-center gap-12">
            <div>
              <Image className="w-34" src={inlineLogo} alt="logo" />
            </div>
          </div>
          <NavMenu />
          <NavActions session={session} />
        </div>
        <div className="flex-1 flex justify-between">
          <Sidebar />
          <div className="flex-grow pt-4 px-4">
            <div className="bg-white min-h-full rounded-t-xl">{children}</div>
          </div>
          <RequestSidebar />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
