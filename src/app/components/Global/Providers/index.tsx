"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
