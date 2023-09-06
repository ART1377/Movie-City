"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../Global/Pagination";
import { Genre, Movie, MoviesList } from "../../../../next-type-d";
import getMovies from "@/app/lib/DataFetching/getMovies";
import Title from "../Global/Title";
import { makeUnique } from "@/app/lib/Functions/Functions";
import CustomSlider from "../Global/CustomSlider";
import MovieCard from "../Global/MovieCard";
import MultiRangeSlider from "multi-range-slider-react";
import { BsChevronDown } from "react-icons/bs";
import { genres } from "@/app/lib/DataFetching/getGenreNameByGenreId";
import Button from "../Global/Button";
import getPeopleDetailById from "@/app/lib/DataFetching/getPeopleDetailById";
import getSearchResultsByQuery from "@/app/lib/DataFetching/getSearchResultsByQuery";

type Props = {};

const MoviePage = (props: Props) => {
  const [sort, setSort] = useState<string>("");
  const [allMovies, setAllMovies] = useState<MoviesList>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(10);
  const handleInputVote = (e: any) => {
    setMinRate(e.minValue.toFixed(1));
    setMaxRate(e.maxValue.toFixed(1));
  };
  const [minDate, setMinDate] = useState(1875);
  const [maxDate, setMaxDate] = useState(2025);
  const handleInputDate = (e: any) => {
    setMinDate(e.minValue);
    setMaxDate(e.maxValue);
  };

  const castRef = useRef<HTMLInputElement>(null);

  // Genre Checkboxes change handler
  const [genre, setGenre] = useState<string[]>([]);

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const name = e.target.name;

    if (isChecked && !genre.find((item) => item == name)) {
      setGenre((prev) => [...prev, name]);
    } else {
      setGenre((prev) => prev.filter((item) => item != name));
    }
  };

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages =
    allMovies?.total_pages! <= 500 ? allMovies?.total_pages : 500;

  // Get All Data in order to implement sort
  useEffect(() => {
    const getMoviesData = setTimeout(async () => {
      const castsData = await getSearchResultsByQuery(
        "1",
        castRef.current?.value!,
        "person"
      );
      const cast = castsData.results[0]?.id.toString();

      const genreData = genre.join("");
      const data: MoviesList = await getMovies(
        +page!,
        cast,
        minDate,
        maxDate,
        minRate,
        maxRate,
        genreData,
        sort
      );
      setAllMovies(data);
      console.log("first");
    }, 1000);


    return () => {
      clearTimeout(getMoviesData);
    };
  }, [genre, maxDate, maxRate, minDate, minRate, page, sort]);

  useEffect(() => {
    // Change Query by Pagination
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", currentPage.toString());
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathName);
  }, [totalPages, page, router, currentPage]);

  // Dropdown Handler Funtion
  const dropdownHandler = () => {
    const arrow = document.getElementById("arrow");
    const dropdown = document.getElementById("dropdown");

    arrow?.classList.toggle("rotate-180");
    dropdown?.classList.toggle("opacity-0");
    dropdown?.classList.toggle("opacity-100");
    dropdown?.classList.toggle("h-0");
    dropdown?.classList.toggle("h-32");
  };

  const searchHandler = async () => {
    const castsData = await getSearchResultsByQuery(
      "1",
      castRef.current?.value!,
      "person"
    );
    const cast = castsData.results[0]?.id.toString();

    const genreData = genre.join("");
    const data: MoviesList = await getMovies(
      +page!,
      cast,
      minDate,
      maxDate,
      minRate,
      maxRate,
      genreData,
      sort
    );
    setAllMovies(data);
  };

  if (!allMovies) {
    return <p>loading ...</p>;
  }

  return (
    <>
      {/* <CustomSlider data={lastFive} /> */}
      <div
        className={`w-full flex flex-wrap items-center gap-8 border-b border-main-green mt-8 mb-4 pb-1 sm:ps-4`}
      >
        {/* <Title>All Movies</Title> */}

        <div className="mb-2 relative">
          <div
            onClick={dropdownHandler}
            className="p-1 border-b border-dark-green text-dark-green min-w-[80px] cursor-pointer flex justify-between items-center"
          >
            <small className="text-sm">Genre</small>
            <div id="arrow" className={`transform transition-all duration-300`}>
              <BsChevronDown className="text-sm" />
            </div>
          </div>
          <div
            id="dropdown"
            className="bg-white py-1.5 px-3 overflow-y-auto rounded-lg absolute z-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 opacity-0 h-0 min-w-[160px] border border-dark-green"
          >
            <ul className="space-y-2">
              {genres.map((genre: Genre, index: number) => {
                return (
                  <li
                    key={genre.id}
                    className={`flex items-center justify-between gap-1 pb-0.5 ${
                      index != genres.length - 1 && "border-b"
                    }`}
                  >
                    <small>{genre.name}</small>
                    <input
                      onChange={(e) => checkboxHandler(e)}
                      type="checkbox"
                      name={`${genre.id.toString()}%2C`}
                      id={genre.id.toString()}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mb-2">
          <label
            htmlFor="castName"
            className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-dark-green"
          >
            With Cast
          </label>
          <input
            ref={castRef}
            type="text"
            id="castName"
            className="text-sm bg-transparent border border-dark-green p-2 focus:shadow-none focus:outline-none caret-dark-green text-text-dark"
          />
        </div>

        <div className="mb-2 w-[150px]">
          <MultiRangeSlider
            min={1875}
            max={2025}
            step={5}
            minValue={minDate}
            maxValue={maxDate}
            ruler={false}
            labels={[`${minDate}`, `${maxDate}`]}
            style={{ border: "none ", boxShadow: "none" }}
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
            minValue={minRate}
            maxValue={maxRate}
            ruler={false}
            labels={[`${minRate}`, `${maxRate == 10 ? 10 : maxRate}`]}
            style={{ border: "none ", boxShadow: "none" }}
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
            htmlFor="underline_select"
            className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-dark-green"
          >
            Sort by
          </label>
          <select
            id="underline_select"
            className="block cursor-pointer text-center p-2 rounded w-fit text-sm text-dark-green bg-transparent border border-dark-green dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer"
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

        <Button btnType="main" type="submit" onClick={searchHandler}>
          Search
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4 mx-auto">
        {allMovies?.results.length > 0 ? (
          allMovies?.results?.map((result: Movie, index: number) => {
            return (
              <div
                key={result.id}
                className="w-[260px] flex justify-center xxs:max-w-[144px] xs:max-w-[180px]"
              >
                <MovieCard imageSize="w185" movie={result} />
              </div>
            );
          })
        ) : (
          <p>no movies found !</p>
        )}
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
