import Link from "next/link";
import React from "react";
import style from "./Logo.module.css";
import { BiCameraMovie } from "react-icons/bi";

type Props = {};

const Logo = (props: Props) => {
  return (
    <>
      <Link href={"/"}>
        <div className={`flex items-center ${style.container}`}>
          <BiCameraMovie className="text-xl xxs:text-2xl me-1 mb-0.5" />
          <h6 className="uppercase me-1 text-sm xxs:text-base">movie</h6>
          <h6 className="uppercase text-sm xxs:text-base">city</h6>
        </div>
      </Link>
    </>
  );
};

export default Logo;
