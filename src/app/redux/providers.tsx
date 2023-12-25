"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      <Provider store={store}>{children}</Provider>
    </>
  );
}
