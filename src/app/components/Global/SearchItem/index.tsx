import React from "react";
import { SearchResult } from "../../../../../next-type-d";
import Link from "next/link";
import Img from "../Img";
import CircularProgress from "../CircularProgress";

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
        className={`flex bg-bg-white shadow-md py-2 px-3 rounded-2xl !w-full gap-3 pb-2 text-text-dark cursor-pointer hover:text-text-dark hover:shadow-none transition-shadow duration-500`}
      >
        <div className="relative !w-24 !h-28 rounded-xl overflow-hidden">
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
          <div className="w-full flex items-center justify-between gap-8">
            <small className="text-sm !boredr-0">
              {result?.result?.first_air_date
                ? result?.result?.first_air_date
                : result?.result?.release_date
                ? result?.result?.release_date
                : result?.result?.known_for_department}
            </small>
            {result?.result?.vote_average ? (
              <div className={``}>
                <CircularProgress
                  percentage={+result?.result?.vote_average?.toFixed(1)}
                />
              </div>
            ) : (
              <small className="text-sm cursor-pointer line-clamp-1">
                {result?.result?.known_for?.[0]?.title}
              </small>
              // <Link
              //   href={`/movie/${result?.result?.known_for?.[0]?.id}`}

              //   className="text-sm cursor-pointer line-clamp-1"
              // >
              //   {result?.result?.known_for?.[0]?.title}
              // </Link>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchItem;
