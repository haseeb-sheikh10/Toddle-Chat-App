import { Search } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { inboxData } from "@/lib/inboxData";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  return (
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
            className="flex items-center bg-white p-3 gap-5 rounded-xl mb-1 mt-1 border-2 border-transparent boxShadow"
          >
            <div className="rounded-full w-10 h-10">
              <Image src={data.image} alt="avatar" className="w-10 h-10" />
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
  );
};

export default Sidebar;
