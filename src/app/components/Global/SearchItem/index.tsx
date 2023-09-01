import React from "react";
import { SearchResult } from "../../../../../next-type-d";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import Img from "../Img";

type Props = {
  result: SearchResult;
};

const SearchItem = (result: Props) => {


 


  return (
    <>
      <Link
        href={`/${
          result?.result?.media_type == "tv"
            ? "series"
            : result?.result?.media_type == "person"
            ? "people"
            : "movie"
        }/${result?.result?.id}`}
        key={result?.result?.id}
        className={`flex bg-white py-2 px-3 rounded-2xl !w-full gap-3 pb-2 text-text-dark cursor-pointer hover:text-text-dark`}
      >
        <div className="relative !w-24 !h-28  rounded-xl overflow-hidden">
          <Img
            url={
              result?.result?.poster_path
                ? result?.result?.poster_path
                : result?.result?.profile_path!
            }
            alternative={`${
              result?.result?.name
                ? result?.result?.name
                : result?.result?.title
            }`}
            size="w185"
          />
        </div>
        <div className="flex flex-col w-full justify-around">
          <p className="hover:text-main-green transition-all line-clamp-2">
            {result?.result?.name
              ? result?.result?.name
              : result?.result?.title}
          </p>
          <div className="w-full flex items-center justify-between">
            <small className="text-sm">
              {result?.result?.first_air_date
                ? result?.result?.first_air_date
                : result?.result?.release_date
                ? result?.result?.release_date
                : result?.result?.known_for_department}
            </small>
            {result?.result?.vote_average ? (
              <small className="flex items-center font-semibold text-sm">
                <BsStarFill className="text-main-green" />
                {result?.result?.vote_average.toFixed(1)}
              </small>
            ) : (
              <Link
                href={`/movie/${result?.result?.known_for?.[0]?.id}`}
                className="text-sm cursor-pointer"
              >
                {result?.result?.known_for?.[0]?.title}
              </Link>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchItem;
