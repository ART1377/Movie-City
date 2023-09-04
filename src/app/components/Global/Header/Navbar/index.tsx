"use client";
import React, { useState } from "react";
import style from "./Navbar.module.css";
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
  BsGithub,BsGoogle
} from "react-icons/bs";
import { BsPeople } from "react-icons/bs";

type Props = {
  show: boolean;
  setState: React.Dispatch<React.SetStateAction<any>>;
};
const Navbar = ({ show, setState }: Props) => {
  return (
    <>
      <nav
        className={`shadow z-50 hidden md:flex ${show ? "!flex" : "hidden"} ${
          style.navbar
        }`}
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
          <li>
            <Link href={"/"} className="flex items-center gap-1">
              <BsHouse className='mt-[3px]' />
              <p className="font-normal">Home</p>
            </Link>
          </li>
          <li>
            <Link href={"/movie/page=1"} className="flex items-center gap-1">
              <BsCameraReels className='mt-[3px]' />
              <p className="font-normal">Movies</p>
            </Link>
          </li>
          <li>
            <Link href={"/series"} className="flex items-center gap-1">
              <BsTv className='mt-[3px]' />
              <p className="font-normal">Series</p>
            </Link>
          </li>
          <li>
            <Link href={"/people"} className="flex items-center gap-1">
              <BsPeople className='mt-[3px]' />
              <p className="font-normal">Celebs</p>
            </Link>
          </li>
          <li>
            <Link href={"/favorites"} className="flex items-center gap-1">
              <BsHeart className='mt-[3px]' />
              <p className="font-normal">Watchlist</p>
            </Link>
          </li>
          {/* <li>
              <Link href={"/"} className="flex items-center gap-1">
                <BiCalendar />
                <p className="font-normal">Coming Soon</p>
              </Link>
            </li> */}

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
        </ul>
        <hr className="h-.5 w-full bg-text-light" />

        <li className="list-none mt-4">
          <Link href={"/"} className="flex items-center gap-1">
            <BsBoxArrowRight />
            <p className="font-normal">Logout</p>
          </Link>
        </li>
      </nav>
    </>
  );
};

export default Navbar;
