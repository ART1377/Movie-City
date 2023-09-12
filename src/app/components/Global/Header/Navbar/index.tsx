"use client";
import React, { useState } from "react";
import style from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BsHouse,
  BsTv,
  BsCameraReels,
  BsHeart,
  BsBoxArrowRight,
  BsX,
  BsPerson,
  BsTelegram,
  BsGithub,
  BsGoogle,
} from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { navbarItem } from "@/app/animations/animation";

type Props = {
  show: boolean;
  setState: React.Dispatch<React.SetStateAction<any>>;
};
const Navbar = ({ show, setState }: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const pathname = usePathname();

  return (
    <>
      <nav
        className={`shadow z-50 hidden md:flex   ${
          show ? `${style.show} ` : `${style.hide} `
        } ${style.navbar} ${
          currentTheme == "dark" && "border-r border-text-light"
        } `}
      >
        {/* <hr className={style.divider} /> */}

        <div>
          <button className="absolute right-1 top-2 mb-4 md:hidden">
            <BsX
              onClick={() => setState(false)}
              className="text-3xl text-text-dark"
            />
          </button>
        </div>

        <div className={style.user}>
          <div className="w-10 h-10 flex justify-center items-center text-text-dark">
            <BsPerson />
          </div>
          <p className="text-sm">userName</p>
        </div>
        <hr className="h-1 w-full bg-text-light" />

        <ul className={`h-full inline-flex flex-col my-2 ${style.navLinks}`}>
          <motion.li
            whileHover={navbarItem}
            className={`${pathname == "/" && style.active}`}
          >
            <Link
              href={"/"}
              onClick={() => setState(false)}
              className="flex items-center gap-1"
            >
              <BsHouse className="mt-[3px]" />
              <p className="font-normal">Home</p>
            </Link>
          </motion.li>
          <motion.li
            whileHover={navbarItem}
            className={`${pathname == "/movie" && style.active}`}
          >
            <Link
              href={"/movie?page=1"}
              onClick={() => setState(false)}
              className="flex items-center gap-1"
            >
              <BsCameraReels className="mt-[3px]" />
              <p className="font-normal">Movies</p>
            </Link>
          </motion.li>
          <motion.li
            whileHover={navbarItem}
            className={`${pathname == "/series" && style.active}`}
          >
            <Link
              href={"/series?page=1"}
              onClick={() => setState(false)}
              className="flex items-center gap-1"
            >
              <BsTv className="mt-[3px]" />
              <p className="font-normal">Series</p>
            </Link>
          </motion.li>
          <motion.li
            whileHover={navbarItem}
            className={`${pathname == "/people" && style.active}`}
          >
            <Link
              href={"/people?page=1"}
              onClick={() => setState(false)}
              className="flex items-center gap-1"
            >
              <BsPeople className="mt-[3px]" />
              <p className="font-normal">Celebs</p>
            </Link>
          </motion.li>
          <motion.li
            whileHover={navbarItem}
            className={`${pathname == "/favorites" && style.active}`}
          >
            <Link
              href={"/favorites?page=1&category=movies"}
              onClick={() => setState(false)}
              className="flex items-center gap-1"
            >
              <BsHeart className="mt-[3px]" />
              <p className="font-normal">Favorites</p>
            </Link>
          </motion.li>
          <li className={`h-full ${style.social}`}>
            <ul className="h-full inline-flex">
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
          </li>
          <li className="list-none">
            <Link href={"/"} className="flex items-center gap-1">
              <BsBoxArrowRight />
              <p className="font-normal">Logout</p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
