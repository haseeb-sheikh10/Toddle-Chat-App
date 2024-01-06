import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";
import { setEmail, setIsApiLoading } from "../slices/addFriendSlice";
import { ChangeEvent, ChangeEventHandler } from "react";
import toast from "react-hot-toast";

export const handleAddFriend = (email: string) => async (dispatch: any) => {
  try {
    const validatedEmail = addFriendValidator.parse({ email });

    dispatch(setIsApiLoading(true));
    const res = await axios.post("http://localhost:3000/api/friends/add", {
      email: validatedEmail,
    });

    dispatch(setIsApiLoading(false));
    toast.success(res.data.message);
    // dispatch(setEmail(""));
  } catch (error) {
    dispatch(setIsApiLoading(false));
    // dispatch(setEmail(""));
    if (error instanceof ZodError) {
      toast.error(error.issues[0].message);
      return;
    }

    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message);
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
