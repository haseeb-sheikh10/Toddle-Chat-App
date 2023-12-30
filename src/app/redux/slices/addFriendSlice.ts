import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  isApiLoading: false,
};

export const addFriendSlice = createSlice({
  name: "addFriend",
  initialState,
  reducers: {
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setIsApiLoading: (state, { payload }) => {
      state.isApiLoading = payload;
    },
  },
});

export const { setEmail, setIsApiLoading } = addFriendSlice.actions;
export default addFriendSlice.reducer;
