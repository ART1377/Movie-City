"use client";
import React, { useState, useEffect } from "react";
import style from "./SearchBar.module.css";
import { BsSearch, BsX } from "react-icons/bs";
import { SearchResults } from "../../../../../../next-type-d";
import getSearchResultsByQuery from "@/app/lib/getSearchResultsByQuery";
import SearchResult from "../../SearchResult";


type Props = {};

const SearchBar = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults>();

  useEffect(() => {
    const getResult = setTimeout(async () => {
      if (searchQuery) {
        const results = await getSearchResultsByQuery(1, searchQuery);
        setSearchResults(results)
      }
    }, 500);

    return () => {
      clearTimeout(getResult);
    };
  }, [searchQuery]);



  const searchClickHandler = () => {
    const input = document.querySelector("input");
    const close = document.getElementById("close");

    close?.classList.remove("hidden");
    close?.classList.add("flex");
    input?.classList.toggle("!max-w-full");
    input?.classList.toggle("!opacity-100");
  };

  const closeClickHandler = () => {
    const input = document.querySelector("input");
    const close = document.getElementById("close");

    input?.classList.remove("!max-w-full");
    input?.classList.remove("!opacity-100");

    close?.classList.add("hidden");
    close?.classList.remove("flex");

    setSearchQuery("");
  };

  return (
    <>
      <div className={` ${style.container}`}>
        <button onClick={searchClickHandler} className={`${style.button}`}>
          <BsSearch className="text-2xl" />
        </button>

        <input
          type="text"
          placeholder="Search ..."
          maxLength={40}
          className={`input shadow  ${style.input}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          onClick={closeClickHandler}
          id="close"
          className="w-8 h-8 cursor-pointer bg-main-green fixed z-50 top-2.5 right-[1%] justify-center items-center text-center rounded-ee-full rounded-se-full hidden sm:!hidden"
        >
          <BsX strokeWidth="2" className="text-white text-xl" />
        </div>
        {!!searchQuery && (
          <div id="results" className={`flex flex-col gap-4 ${style.results}`}>
            <SearchResult data={searchResults!} query={searchQuery} />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
