import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { setFriendRequests } from "../slices/friendRequestSlice";
import { ZodError } from "zod";

export const handleAcceptRequest = (id: string) => async (dispatch: any) => {
  try {
    const res = await axios.post("http://localhost:3000/api/requests/accept", {
      id: id,
    });
    dispatch(setFriendRequests(res.data.data.requests));
    toast.success(res.data.message);
  } catch (error) {
    if (error instanceof ZodError) {
      toast.error(error.issues[0].message);
      return;
    }

    if (error instanceof AxiosError) {
      // console.log(error);
      toast.error(error.response?.data?.message);
      return;
    }

    toast.error("POST ERROR! Something went wrong");
    return;
  }
};

export const handleRejectRequest = (id: string) => async (dispatch: any) => {
  try {
    const res = await axios.post("http://localhost:3000/api/requests/reject", {
      id: id,
    });
    dispatch(setFriendRequests(res.data.data.requests));
    toast.success(res.data.message);
  } catch (error) {
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
