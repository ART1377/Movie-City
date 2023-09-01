"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  withLine?: boolean;
  center?:boolean;
};

const Title = ({ children, withLine,center}: Props) => {
  return (
    <>
      <h6 className={`mt-4 mb-1.5 font-semibold text-base text-text-dark xs:text-xl ${!center?'border-l-4 border-main-green ps-2 ':'border-0 mx-auto text-center border-b-2 border-main-green pb-1 px-2'}`}>
        {children}
      </h6>
      {withLine && <hr className="bg-gray-300 mt-0.5 mb-2 h-0.5 " />}
    </>
  );
};

export default Title;
