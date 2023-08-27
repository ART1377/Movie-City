"use client";
import React, { useState } from "react";
import style from "./SearchBar.module.css";
import { BiSearch, BiX } from "react-icons/bi";

type Props = {};

const SearchBar = (props: Props) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <>
      {/* Mobile */}
      <div className="flex justify-end w-full me-4 sm:hidden">
        <button onClick={() => setShowSearch(true)}>
          <BiSearch className="text-2xl" />
        </button>
      </div>
      {showSearch && (
        <div className={`sm:hidden ${style.searchBar}`}>
          <div>
          <button className="absolute right-0 transform -translate-y-1/2 top-1/2">
            <BiX
              onClick={() => setShowSearch(false)}
              className="text-2xl text-white"
            />
          </button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search ..."
              maxLength={40}
              className="overflow-x-hidden py-1 px-4 w-full rounded-2xl focus:shadow-none focus:outline-none"
            />
            <button>
              <BiSearch />
            </button>
          </div>
        </div>
      )}

      {/* Decktop */}
      <div className={`hidden sm:block relative ${style.container}`}>
        <button className="absolute transform -translate-y-1/2 top-1/2 right-2">
          <BiSearch className="text-2xl" />
        </button>
        <input
          type="text"
          placeholder="Search ..."
          maxLength={40}
          className="py-1 px-4 w-full rounded-2xl focus:shadow-none focus:outline-none"
        />
      </div>
    </>
  );
};

export default SearchBar;
