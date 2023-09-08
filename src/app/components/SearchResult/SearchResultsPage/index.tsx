"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getSearchResultsByQuery from '../../../lib/DataFetching/getSearchResultsByQuery'
import { SearchResult, SearchResults } from "../../../../../next-type-d";
import SearchItem from "../../Global/SearchItem";
import Title from "../../Global/Title";
import Pagination from "../../Global/Pagination";

type Props = {};

export const dynamic = "force-dynamic";

const SearchResultsPage = (props: Props) => {
  const [category, setCategory] = useState<string>("multi");
  const [results, setResults] = useState<SearchResults>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages = results?.total_pages!;

  useEffect(() => {
    async function getResults() {
      const data = await getSearchResultsByQuery(page!, query!, category);
      setResults(data);
    }
    getResults();

    // Change Query by Pagination
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", currentPage.toString());
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathName);

    return () => {};
  }, [query, page, router, currentPage, category]);

  if (!results?.results) {
    return <p>loading ...</p>;
  }

  return (
    <>
      <Title >{`All Results form '${query}'`}</Title>
      <div className="w-full flex gap-8 border-b border-main-green mt-8 mb-4 pb-2 ps-2 sm:ps-4">
        <small
          className={`${
            category == "multi" && "border-t border-main-green text-main-green"
          } pt-1 xs:text-sm sm:text-base hover:text-main-green transition-all duration-300 cursor-pointer`}
          onClick={() => setCategory("multi")}
        >
          all
        </small>
        <small
          className={`${
            category == "movie" && "border-t border-main-green text-main-green"
          } pt-1 xs:text-sm sm:text-base hover:text-main-green transition-all duration-300 cursor-pointer`}
          onClick={() => setCategory("movie")}
        >
          movies
        </small>
        <small
          className={`${
            category == "tv" && "border-t border-main-green text-main-green"
          } pt-1 xs:text-sm sm:text-base hover:text-main-green transition-all duration-300 cursor-pointer`}
          onClick={() => setCategory("tv")}
        >
          series
        </small>
        <small
          className={`${
            category == "person" && "border-t border-main-green text-main-green"
          } pt-1 xs:text-sm sm:text-base hover:text-main-green transition-all duration-300 cursor-pointer`}
          onClick={() => setCategory("person")}
        >
          person
        </small>
      </div>
      <div className="flex flex-wrap justify-around gap-4 mt-4 mb-12 mx-auto">
        {results?.results?.map((result: SearchResult) => {
          return (
            <div
              key={result.id}
              className="w-full xm:w-[45%] max-w-[500px] bg-white rounded-2xl"
            >
              <SearchItem result={result} />
            </div>
          );
        })}
      </div>
      <Pagination
        total={totalPages}
        current={+page!}
        setCurrent={setCurrentPage}
      />
    </>
  );
};

export default SearchResultsPage;
