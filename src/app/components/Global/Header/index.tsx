"use client";
import React, { useState } from "react";
import Logo from "../Logo/Logo";
import SearchBar from "./SearchBar";
import style from "./Header.module.css";
import {
  BiSun,
  BiMoon,
  BiUser,
  BiMenuAltLeft,
} from "react-icons/bi";
import Navbar from "./Navbar";

type Props = {};

const Header = (props: Props) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  return (
    <>
      <header className={`sticky top-0 shadow-sm z-40 ${style.header}`}>
        <div className="flex justify-between items-center py-3 px-2 xs:px-3">
          <div
            className="md:!hidden !flex items-center cursor-pointer"
            onClick={() => setShowNavbar((prev) => !prev)}
          >
            <BiMenuAltLeft className="md:hidden me-3 text-2xl" />
          </div>
          <Logo />
          <SearchBar />
          <div className={`flex items-center gap-2 ${style.icons}`}>
            <div>
              <BiSun />
            </div>
            <div>
              <BiUser />
            </div>
          </div>
        </div>
        <Navbar show={showNavbar} setState={setShowNavbar} />
      </header>
    </>
  );
};

export default Header;
