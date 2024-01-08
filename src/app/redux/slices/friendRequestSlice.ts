import { createSlice } from "@reduxjs/toolkit";

interface FriendRequestStates {
  friendRequests: User[];
}

const initialState: FriendRequestStates = {
  friendRequests: [],
};

const friendRequestSlice = createSlice({
  initialState,
  name: "friendRequest",
  reducers: {
    setFriendRequests: (state, { payload }) => {
      state.friendRequests = payload;
    },
  },
});

export const { setFriendRequests } = friendRequestSlice.actions;
export default friendRequestSlice.reducer;
