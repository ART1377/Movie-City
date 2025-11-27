import React from "react";
import { SearchResult, SearchResults } from "../../../../../next-type-d";
import Img from "../Img";
import { BsStarFill, BsArrowUpRightCircle } from "react-icons/bs";
import Link from "next/link";
import SearchItem from "../SearchItem";

type Props = {
  data: SearchResults;
  query: string;
};

const SearchItems = ({ data, query }: Props) => {
  if (+data?.results?.length == 0 || !data) {
    return (
      <div className="flex justify-center items-center text-center min-h-[100px] bg-bg-white">
        <p>No Results !</p>
      </div>
    );
  }
  return (
    <>
      {data.results.map((result: SearchResult, index: number) => {
        if (
          index < 3 &&
          (result?.media_type == "tv" ||
            result?.media_type == "movie" ||
            result?.media_type == "person")
        ) {
          return <SearchItem key={result.id} result={result} />;
        }
      })}

      {+data.results.length > 3 && (
        <Link
          href={`/searchresults/?query=${query}&page=1`}
          className="text-text-dark cursor-pointer pt-2 flex items-center gap-2 text-center mx-auto group"
        >
          {` show all resluts for  '${query}'`}
          <BsArrowUpRightCircle className="group-hover:translate-x-0.5 group-hover:scale-110" />
        </Link>
      )}
      {+data.results.length > 0 && +data.results.length < 3 && (
        <Link
          href={`/searchresults/?query=${query}&page=1`}
          className="text-text-dark cursor-pointer pt-2 flex items-center gap-2 text-center mx-auto group"
        >
          {` show all ${data.results.length} resluts for  '${query}'`}
          <BsArrowUpRightCircle className="group-hover:translate-x-0.5 group-hover:scale-110" />
        </Link>
      )}
    </>
  );
};

export default SearchItems;
