import AddFriend from "@/components/Friends/AddFriend";

import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <>
      <div className="w-[80%] p-4">
        <div className="text-4xl font-bold text-secondary py-3">
          <h2>Add A New Friend Via Email</h2>
        </div>
        <AddFriend />
      </div>
    </>
  );
};

export default page;
