"use client";
import React, { useState, useEffect } from "react";
import style from "./SearchBar.module.css";
import { BsSearch, BsX } from "react-icons/bs";
import { SearchResults } from "../../../../../../next-type-d";
import getSearchResultsByQuery from "@/app/lib/DataFetching/getSearchResultsByQuery";
import SearchResult from "../../SearchItems";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {};

const SearchBar = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults>();

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const getResult = setTimeout(async () => {
      if (searchQuery) {
        const results = await getSearchResultsByQuery('1', searchQuery);
        setSearchResults(results);
      }
    }, 500);

    return () => {
      clearTimeout(getResult);
    };
  }, [searchQuery]);


// Close Search Bar When 'href' Changes

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setShow(false);
    setSearchQuery("");
  }, [pathname,searchParams]);



  const searchClickHandler = () => {
    setShow(true);
  };

  const closeClickHandler = () => {
    setShow(false);
    setSearchQuery("");
  };

  return (
    <>
      <div className={` ${style.container}`}>
        <button onClick={searchClickHandler} className={`${style.button} `}>
          <BsSearch className="text-2xl" />
        </button>

        <input
          type="text"
          placeholder="Search ..."
          maxLength={40}
          className={`input shadow ${
            show
              ? "!max-w-full !opacity-100 sm:!max-w-full sm:!opacity-100"
              : "sm:!max-w-full sm:!opacity-100"
          } ${style.input}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          onClick={closeClickHandler}
          id="close"
          className={`w-8 h-8 cursor-pointer bg-main-green fixed z-[70] top-2.5 right-[1%] justify-center items-center text-center rounded-ee-full rounded-se-full sm:absolute sm:top-0 sm:right-0 ${
            show ? "flex sm:hidden" : "hidden"
          } ${searchQuery && "sm:!flex"}`}
        >
          <BsX strokeWidth="2" className="text-white text-xl" />
        </div>
          <div id="results" className={`flex flex-col gap-4 shadow-2xl border-2 ${searchQuery&&'!transform !translate-y-0 !-translate-x-1/2 sm:!translate-x-0'} ${style.results}`}>
            <SearchResult data={searchResults!} query={searchQuery} />
          </div>
      </div>
    </>
  );
};

export default SearchBar;
