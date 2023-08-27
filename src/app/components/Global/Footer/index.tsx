"use client";
import React from "react";
import style from "./Footer.module.css";
import Logo from "../Logo/Logo";
import Link from "next/link";
import {
  BiLogoTelegram,
  BiLogoGithub,
  BiLogoGmail,
  BiPhone,
  BiEnvelope,
} from "react-icons/bi";

type Props = {};

const index = (props: Props) => {
  return (
    <>
      <footer
        className={`${style.footer} bg-white w-full  py-3 px-2 xs:px-3 mt-auto`}
      >
        <div className="flex flex-col items-center lg:flex-row lg:!justify-around gap-3 lg:gap-8">
          <div className="flex flex-col items-center gap-3 xs:flex-row xs:justify-between lg:!justify-around w-full">
            <div>
              <Logo />
            </div>
            <div>
              <ul
                className={`h-full inline-flex gap-2 sm:gap-3 my-2 ${style.navLinks}`}
              >
                <li className="text-sm xs:text-base">
                  <Link href={"/movie"}>Movies</Link>
                </li>
                <li className="text-sm xs:text-base">
                  <Link href={"/series"}>Series</Link>
                </li>
                <li className="text-sm xs:text-base">
                  <Link href={"/people"}>Celebs</Link>
                </li>
                <li className="text-sm xs:text-base">
                  <Link href={"/favorites"}>Watchlist</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* contact us */}
          <div className="flex flex-col items-center gap-3 xs:flex-row xs:justify-between lg:!justify-around w-full">
            <Link
              className="text-xs xxs:text-sm flex items-center gap-0.5"
              href="mailto:alirezatt705@gmail.com"
            >
              <BiEnvelope /> alirezatt705@gmail.com
            </Link>
            <Link
              className="text-xs xxs:text-sm flex items-center gap-0.5"
              href="tel:+989193050762"
            >
              <BiPhone /> 09193050762
            </Link>
            <div className={`h-full ${style.social}`}>
              <ul className="h-full inline-flex gap-2">
                <li>
                  <Link href={"https://t.me/ART_1377"} target="_blank" className="flex items-center gap-1">
                    <BiLogoTelegram />
                  </Link>
                </li>
                <li>
                  <Link href={"mailto:alirezatt705@gmail.com"} className="flex items-center gap-1">
                    <BiLogoGmail />
                  </Link>
                </li>
                <li>
                  <Link
                    passHref
                    href={"https://github.com/ART1377"} target="_blank"
                    className="flex items-center gap-1"
                  >
                    <BiLogoGithub />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default index;
