import React, { useState } from "react";

type Props = {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
};

const Toggle = ({ toggle, setToggle }: Props) => {
  return (
    <div
      onClick={() => setToggle(!toggle)}
      className={`w-10 h-5 rounded-2xl border-2 shadow-sm relative px-1 transition-all duration-500 ${
        toggle ? "bg-light-green" : "bg-bg-body"
      }`}
    >
      <div
        className={`bg-bg-white border w-4 h-4 rounded-full absolute top-1/2 left-0 transform -translate-y-1/2 shadow-2xl transition-all duration-300 ${
          toggle && "translate-x-5"
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
