import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";
import { setEmail, setIsApiLoading } from "../slices/addFriendSlice";
import { ChangeEvent, ChangeEventHandler } from "react";
import toast from "react-hot-toast";

export const handleAddFriend = (email: string) => async (dispatch: any) => {
  try {
    const validatedEmail = addFriendValidator.parse({ email });

    console.log(validatedEmail);
    dispatch(setIsApiLoading(true));
    const res = await axios.post("/api/friends/add", { email: validatedEmail });

    dispatch(setIsApiLoading(false));
    dispatch(setEmail(""));
    toast.success(res.data?.message);
  } catch (error) {
    dispatch(setIsApiLoading(false));
    dispatch(setEmail(""));
    if (error instanceof ZodError) {
      toast.error("Invalid Email!");
      return;
    }

    if (error instanceof AxiosError) {
      toast.error(error.response?.data);
      return;
    }

    toast.error("POST ERROR! Something went wrong");
    return;
  }
};

export const handleChangeEmail: ChangeEventHandler<HTMLInputElement> =
  (e: ChangeEvent<HTMLInputElement>) => (dispatch: any) => {
    dispatch(setEmail(e.target.value));
  };
