"use client";

import { configureStore } from "@reduxjs/toolkit";
import auth from "@/app/redux/slices/authSlice";
import addFriend from "@/app/redux/slices/addFriendSlice";

export const store = configureStore({
  reducer: {
    auth,
    addFriend,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
