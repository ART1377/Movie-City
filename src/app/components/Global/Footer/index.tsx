"use client";
import React from "react";
import style from "./Footer.module.css";
import Logo from "../Logo/Logo";
import Link from "next/link";
import {
  BsTelegram,
  BsGithub,
  BsEnvelope,
  BsTelephone,
  BsGoogle,
} from "react-icons/bs";

type Props = {};

const index = (props: Props) => {
  return (
    <>
      <footer
        className={`${style.footer} w-full py-3 px-2 xs:px-3 mt-auto`}
      >
        <div className="flex flex-col items-center xxs:items-start xs:items-center lg:flex-row lg:!justify-around gap-3 lg:gap-8">
          <div className="flex flex-col items-center xxs:items-start xs:items-center gap-3 xs:flex-row xs:justify-between lg:!justify-around w-full">
            <div>
              <Logo />
            </div>
            <div>
              <ul
                className={`h-full inline-flex gap-2 sm:gap-3 my-2 ${style.navLinks}`}
              >
                <li className="text-sm xs:text-base">
                  <Link href={"/movie?page=1"}>Movies</Link>
                </li>
                <li className="text-sm xs:text-base">
                  <Link href={"/series?page=1"}>Series</Link>
                </li>
                <li className="text-sm xs:text-base">
                  <Link href={"/people?page=1"}>Celebs</Link>
                </li>
                <li className="text-sm xs:text-base">
                  <Link href={"/favorites?page=1&category=movies"}>
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* contact us */}
          <div className="flex flex-col items-center xxs:items-start xs:items-center gap-3 xs:flex-row xs:justify-between lg:!justify-around w-full">
            <div className="flex flex-col items-center gap-4 xxs:flex-row xxs:justify-between">
              <Link
                className="text-xs xxs:text-sm flex items-center gap-0.5"
                href="mailto:alirezatt705@gmail.com"
              >
                <BsEnvelope /> alirezatt705@gmail.com
              </Link>
              <Link
                className="text-xs xxs:text-sm flex items-center gap-0.5"
                href="tel:+989193050762"
              >
                <BsTelephone /> 09193050762
              </Link>
            </div>
            <div className={`h-full ${style.social}`}>
              <ul className="h-full inline-flex gap-2">
                <li>
                  <Link
                    href={"https://t.me/ART_1377"}
                    target="_blank"
                    className="flex items-center gap-1"
                  >
                    <BsTelegram />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"mailto:alirezatt705@gmail.com"}
                    className="flex items-center gap-1"
                  >
                    <BsGoogle />
                  </Link>
                </li>
                <li>
                  <Link
                    passHref
                    href={"https://github.com/ART1377"}
                    target="_blank"
                    className="flex items-center gap-1"
                  >
                    <BsGithub />
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
