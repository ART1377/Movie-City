import Link from "next/link";
import React from "react";
import style from "./Logo.module.css";
import { BsCameraReels } from "react-icons/bs";

type Props = {};

const Logo = (props: Props) => {
  return (
    <>
      <Link href={"/"}>
        <div className={`flex items-center ${style.container}`}>
          <BsCameraReels className="text-lg xxs:text-xl me-1 mb-1" />
          <h6 className="uppercase me-1 text-sm xxs:text-base">movie</h6>
          <h6 className="uppercase text-sm xxs:text-base">city</h6>
        </div>
      </Link>
    </>
  );
};

export default Logo;
