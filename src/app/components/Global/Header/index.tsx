"use client";
import React, { useState } from "react";
import Logo from "../Logo/Logo";
import SearchBar from "./SearchBar";
import style from "./Header.module.css";
import { BsSun, BsMoon, BsPerson, BsMenuButtonWide } from "react-icons/bs";
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
            <div
              className={`md:hidden me-3 w-8 h-7 text-center gap-[3px] flex flex-col justify-center ${
                showNavbar ? style.menuBarContainer:style.menuBarContainerLine
              }`}
            >
              <div
                className={`w-6 h-[2.5px] bg-text-dark opacity-80 rounded-md mx-auto ${style.menuBar}`}
              ></div>
              <div
                className={`w-6 h-[2.5px] bg-text-dark opacity-80 rounded-md mx-auto ${style.menuBar}`}
              ></div>
              <div
                className={`w-6 h-[2.5px] bg-text-dark opacity-80 rounded-md mx-auto ${style.menuBar}`}
              ></div>
            </div>
          </div>
          <Logo />
          <SearchBar />
          <div className={`flex items-center gap-2 ${style.icons}`}>
            <div>
              <BsSun />
            </div>
            <div>
              <BsPerson />
            </div>
          </div>
        </div>
        <Navbar show={showNavbar} setState={setShowNavbar} />
      </header>
    </>
  );
};

export default Header;
