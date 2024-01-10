"use client";

import {
  handleAddFriend,
  handleChangeEmail,
} from "@/app/redux/actions/addFriendAction";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Send } from "lucide-react";
import { FC } from "react";

interface AddFriendProps {}

const AddFriend: FC<AddFriendProps> = () => {
  const dispatch = useAppDispatch();
  const { email, isApiLoading } = useAppSelector((state) => state.addFriend);

  return (
    <>
      <div className="w-[50%] flex gap-2 mt-5">
        <Input
          type="email"
          placeholder="Enter Email"
          icon={<Send className="absolute left-4 w-4 h-4 fill-none" />}
          value={email}
          onChange={(e) => dispatch(handleChangeEmail(e.target.value))}
        />
        <Button
          isLoading={isApiLoading}
          variant="default"
          size="lg"
          className="text-lg bg-primary boxShadow rounded-xl"
          handleClick={() => dispatch(handleAddFriend(email))}
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default AddFriend;
