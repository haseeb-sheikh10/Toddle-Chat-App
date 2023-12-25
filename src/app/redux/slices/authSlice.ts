import { createSlice } from "@reduxjs/toolkit";

interface authState {
  signInCreds: {
    email: string;
    password: string;
  };
  signUpCreds: {
    name: string;
    email: string;
    image?: string;
    password: string;
  };
}

const initialState: authState = {
  signInCreds: {
    email: "",
    password: "",
  },
  signUpCreds: {
    name: "",
    email: "",
    image: "",
    password: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignInCreds: (state, { payload }) => {
      state.signInCreds = payload;
    },
    setSignUpCreds: (state, { payload }) => {
      state.signUpCreds = payload;
    },
  },
});

export const { setSignInCreds, setSignUpCreds } = authSlice.actions;
export default authSlice.reducer;
