import React from "react";
import { SearchResult, SearchResults } from "../../../../../next-type-d";
import Img from "../Img";
import { BsStarFill } from "react-icons/bs";
import Link from "next/link";

type Props = {
  data: SearchResults;
  query: string;
};

const SearchResult = ({ data, query }: Props) => {
  if (+data?.results?.length == 0 || !data) {
    return (
      <div className="flex justify-center items-center text-center min-h-[100px]">
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
          return (
            <Link
              href={`/${
                result.media_type == "tv"
                  ? "series"
                  : result.media_type == "person"
                  ? "people"
                  : "movie"
              }/${result.id}`}
              key={result.id}
              className={`flex !w-full gap-2 pb-2 text-text-dark cursor-pointer hover:text-text-dark ${
                index != 2 && "border-b-2"
              }`}
            >
              <div className="relative !w-24 !h-28  rounded-xl overflow-hidden">
                <Img
                  url={
                    result?.poster_path
                      ? result?.poster_path
                      : result?.profile_path!
                  }
                  alternative={`${result?.name ? result?.name : result?.title}`}
                  size="w185"
                />
              </div>
              <div className="flex flex-col w-full justify-around">
                <p className="hover:text-main-green transition-all">
                  {result?.name ? result?.name : result?.title}
                </p>
                <div className="w-full flex items-center justify-between">
                  <small className="text-sm">
                    {result?.first_air_date
                      ? result?.first_air_date
                      : result?.release_date
                      ? result?.release_date
                      : result?.known_for_department}
                  </small>
                  {result?.vote_average ? (
                    <small className="flex items-center font-semibold text-sm">
                      <BsStarFill className="text-main-green" />
                      {result?.vote_average.toFixed(1)}
                    </small>
                  ) : (
                    <Link
                      href={`/movie/${result?.known_for?.[0].id}`}
                      className="text-sm cursor-pointer"
                    >
                      {result?.known_for?.[0].title}
                    </Link>
                  )}
                </div>
              </div>
            </Link>
          );
        }
      })}

      {+data.results.length > 3 && (
        <Link
          href={"/"}
          className="text-text-dark cursor-pointer border-t-2 pt-2"
        >
          {` show all resluts for  '${query}'`}
        </Link>
      )}
    </>
  );
};

export default SearchResult;
