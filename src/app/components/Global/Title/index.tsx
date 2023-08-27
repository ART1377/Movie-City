"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  withLine?: boolean;
};

const Title = ({ children, withLine}: Props) => {
  return (
    <>
      <h6 className="mt-4 mb-1.5 font-semibold border-l-4 border-main-green ps-1 text-base xs:text-xl">
        {children}
      </h6>
      {withLine && <hr className="bg-gray-300 mt-0.5 mb-2 h-0.5 " />}
    </>
  );
};

export default Title;
