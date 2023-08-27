import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import style from "./SectionDevider.module.css";
import Link from "next/link";

type Props = {
  title: string;
  path: string;
};

const SectionDevider = ({ title, path }: Props) => {
  return (
    <>
      <div className="w-full border-b border-main-green p-2 mb-2">
        <Link href={path} className="inline-flex items-center">
          <h6 className="border-l-4 border-main-green px-2">{title}</h6>
          <BiSolidRightArrow className="text-2xl text-main-green" />
        </Link>
      </div>
    </>
  );
};

export default SectionDevider;
