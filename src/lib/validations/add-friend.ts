import { z } from "zod";

export const addFriendValidator = z.object({
  email: z.string().email(),
});

export const removeFriendValidator = z.object({
  id: z.string(),
});
