"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../Global/Pagination";
import { Movie, MoviesList } from "../../../../next-type-d";
import getMovies from "@/app/lib/DataFetching/getMovies";
import Title from "../Global/Title";
import { makeUnique } from "@/app/lib/Functions/Functions";
import CustomSlider from "../Global/CustomSlider";
import MovieCard from "../Global/MovieCard";
import MultiRangeSlider from "multi-range-slider-react";
import CircularProgress from "../Global/CircularProgress";

type Props = {};

const MoviePage = (props: Props) => {
  const [sort, setSort] = useState<string>("");
  const [allMovies, setAllMovies] = useState<MoviesList>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [minVote, setMinVote] = useState(0);
  const [maxVote, setMaxVote] = useState(10);
  const handleInputVote = (e:any) => {
    setMinVote(e.minValue.toFixed(1));
    setMaxVote(e.maxValue.toFixed(1));
  };
  const [minDate, setMinDate] = useState(1875);
  const [maxDate, setMaxDate] = useState(2025);
  const handleInputDate = (e:any) => {
    setMinDate(e.minValue);
    setMaxDate(e.maxValue);
  };


  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages = 500;

  // Get All Data in order to implement sort
  useEffect(() => {
    async function getAllResults() {
      // const data: MoviesList = await getMovies();
      const data: MoviesList = await getMovies(+page!);
      setAllMovies(data);
    }
    getAllResults();

    // Change Query by Pagination
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", currentPage.toString());
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathName);
  }, [totalPages, page, router, currentPage]);

 

  if (!allMovies) {
    return <p>loading ...</p>;
  }

  return (
    <>
      {/* <CustomSlider data={lastFive} /> */}
      <div className="w-full flex flex-col justify-between items-center gap-8 border-b border-main-green mt-8 mb-4 pb-1 sm:ps-4">
        {/* <Title>All Movies</Title> */}
        <CircularProgress percentage={6} />

        <div className="mb-2 w-[150px]">
          <MultiRangeSlider
            min={1875}
            max={2025}
            step={5}
            minValue={minDate}
            maxValue={maxDate}
            ruler={false}
            labels={[`${minDate}`,`${maxDate}`]}
            style={{ border: "none ", boxShadow: "none"}}
            barLeftColor="var(--light-green)"
            barInnerColor="var(--main-green)"
            barRightColor="var(--light-green)"
            thumbLeftColor="var(--main-green)"
            thumbRightColor="var(--main-green)"
            onInput={(e) => {
              handleInputDate(e);
            }}
          />
        </div>
        <div className="mb-2 w-[150px]">
          <MultiRangeSlider
            min={0}
            max={10}
            step={0.1}
            minValue={minVote}
            maxValue={maxVote}
            ruler={false}
            labels={[`${minVote}`,`${maxVote==10?10:maxVote}`]}
            style={{ border: "none ", boxShadow: "none"}}
            barLeftColor="var(--light-green)"
            barInnerColor="var(--main-green)"
            barRightColor="var(--light-green)"
            thumbLeftColor="var(--main-green)"
            thumbRightColor="var(--main-green)"
            onInput={(e) => {
              handleInputVote(e);
            }}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="castName"
            className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-main-green"
          >
            With Cast
          </label>
          <input
            type="text"
            id="castName"
            className="text-sm bg-transparent border border-main-green p-2 focus:shadow-none focus:outline-none caret-dark-green text-dark-green"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="underline_select"
            className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-main-green"
          >
            Sort by
          </label>
          <select
            id="underline_select"
            className="block cursor-pointer text-center p-2 rounded w-fit text-sm text-dark-green bg-transparent border border-main-green dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer"
            onChange={(e) => setSort(e?.target?.value as any)}
            value={sort}
          >
            <option onClick={() => setSort("")} value={""}>
              none
            </option>
            <option
              onClick={() => setSort("popularity.asc")}
              value={"popularity.asc"}
            >
              popularity .asc
            </option>
            <option
              onClick={() => setSort("popularity.desc")}
              value={"popularity.desc"}
            >
              popularity .desc
            </option>
            <option
              onClick={() => setSort("vote_average.asc")}
              value={"vote_average.asc"}
            >
              rate .asc
            </option>
            <option
              onClick={() => setSort("vote_average.desc")}
              value={"vote_average.desc"}
            >
              rate .desc
            </option>
            <option
              onClick={() => setSort("primary_release_date.asc")}
              value={"primary_release_date.asc"}
            >
              date .asc
            </option>
            <option
              onClick={() => setSort("primary_release_date.desc")}
              value={"primary_release_date.desc"}
            >
              date .desc
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4 mx-auto">
        {allMovies?.results?.map((result: Movie, index: number) => {
          return (
            <div key={result.id} className="max-w-[150px] sm:min-w-[180px]">
              <MovieCard imageSize="w185" movie={result} />
            </div>
          );
        })}
      </div>
      <Pagination
        total={totalPages!}
        current={+page!}
        setCurrent={setCurrentPage}
      />
    </>
  );
};

export default MoviePage;
