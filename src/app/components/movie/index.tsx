"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./Movie.module.css";
import Pagination from "../Global/Pagination";
import { Company, Genre, Movie, MoviesList } from "../../../../next-type-d";
import getMovies from "@/app/lib/DataFetching/getMovies";
import CustomSlider from "../Global/CustomSlider";
import MovieCard from "../Global/MovieCard";
import MultiRangeSlider from "multi-range-slider-react";
import {
  BsChevronDown,
  BsTrash3,
  BsSearch,
  BsCameraReels,
} from "react-icons/bs";
import getGenreNameByGenreId, {
  genres,
} from "@/app/lib/DataFetching/getGenreNameByGenreId";
import getSearchResultsByQuery from "@/app/lib/DataFetching/getSearchResultsByQuery";
import Toggle from "../Global/Toggle";
import { companies } from "@/app/data";

type Props = {};

const MoviePage = (props: Props) => {
  const [sort, setSort] = useState<string>("");
  const [allMovies, setAllMovies] = useState<MoviesList>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [adult, setAdult] = useState<boolean>(false);

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

  const [castName, setCastName] = useState("");
  const [crewName, setCrewName] = useState("");

  const [companyName, setCompanyName] = useState<string>("");

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

  // Reset Handler
  const resetHandler = () => {
    setCastName("");
    setCrewName("");
    setGenre([]);
    setAdult(false);
    setCompanyName("");
    setMinRate(0);
    setMaxRate(10);
    setMinDate(1875);
    setMaxRate(2025);
    setSort("");
  };

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages =
    allMovies?.total_pages! <= 500 ? allMovies?.total_pages : 500;



    


  // Get All Data in order to implement sort
  useEffect(() => {
    const getMoviesData = setTimeout(async () => {
      const castsData = await getSearchResultsByQuery("1", castName, "person");
      const cast = castsData.results[0]?.id.toString();

      const crewsData = await getSearchResultsByQuery("1", crewName, "person");
      const crew = crewsData.results[0]?.id.toString();

      const genreData = genre.join("%2C");
      const data: MoviesList = await getMovies(
        +page!,
        adult,
        cast,
        crew,
        minDate,
        maxDate,
        minRate,
        maxRate,
        genreData,
        sort,
        companyName
      );
      setAllMovies(data);
    }, 500);

    return () => {
      clearTimeout(getMoviesData);
    };
  }, [
    castName,
    genre,
    maxDate,
    maxRate,
    minDate,
    minRate,
    page,
    sort,
    adult,
    crewName,
    companyName,
  ]);

  useEffect(() => {
    // Change Query by Pagination
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", currentPage.toString());
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathName);
  }, [currentPage, router]);

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


  return (
    <>
      {/* <CustomSlider data={lastFive} /> */}

      <div className="bg-bg-white relative rounded-2xl w-full h-16 mb-3 overflow-hidden flex justify-between items-center max-w-[96%] lg:max-w-full lg:mb-6 mx-auto">
        <div className="flex items-center gap-2 ps-3 xs:ps-5">
          <BsSearch className="text-gray-300 text-3xl" />
          <p className="text-text-dark font-medium xs:text-xl sm:text-2xl">
            Search in all
            <span className="text-main-green ml-1">Movies</span>
          </p>
        </div>
        <div className="bg-dark-green w-16 h-16 flex justify-center items-center">
          <BsCameraReels className="text-white text-2xl" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse lg:gap-2">
        <div className="bg-bg-white rounded-2xl border-b border-main-green overflow-hidden max-w-[96%] lg:h-fit lg:max-w-[240px] lg:mr-2 mx-auto lg:sticky lg:top-[60px]">
          <div className="text-center py-2 mb-6">
            <h6 className="text-text-dark">
              <span className="text-main-green mr-1">Advance</span>
              Search
            </h6>
          </div>

          <div
            className={`w-full flex flex-wrap justify-center items-center gap-8 mb-8 py-2 px-4 rounded-none `}
          >
            {/* Cast Name Input */}
            <div className={`mb-2 ${style.input}`}>
              <label
                htmlFor="castName"
                className="text-xs bg-bg-white absolute -mt-2 ml-1 px-1 text-dark-green"
              >
                Cast Name
              </label>
              <input
                onChange={(e) => setCastName(e.target.value)}
                value={castName}
                type="text"
                id="castName"
                className="text-sm bg-transparent border border-dark-green p-2 focus:shadow-none focus:outline-none caret-dark-green text-text-dark w-full"
              />
            </div>

            {/* Crew Name Input */}
            <div className={`mb-2 ${style.input}`}>
              <label
                htmlFor="castName"
                className="text-xs bg-bg-white absolute -mt-2 ml-1 px-1 text-dark-green"
              >
                Crew Name
              </label>
              <input
                onChange={(e) => setCrewName(e.target.value)}
                value={crewName}
                type="text"
                id="castName"
                className="text-sm bg-transparent border border-dark-green p-2 focus:shadow-none focus:outline-none caret-dark-green text-text-dark w-full"
              />
            </div>

            {/* SortBy Select Option */}
            <div className={`mb-2 ${style.input}`}>
              <label
                htmlFor="underline_select"
                className="text-xs bg-bg-white absolute -mt-2 ml-1 px-1 text-dark-green"
              >
                Company
              </label>
              <select
                id="underline_select"
                className="block cursor-pointer text-center p-2 rounded text-sm text-dark-green bg-transparent border border-dark-green dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer w-full"
                onChange={(e) => setCompanyName(e?.target?.value as any)}
                value={companyName}
              >
                <option onClick={() => setCompanyName("")} value={""}>
                  none
                </option>
                {companies.map((company: Company) => {
                  return (
                    <option
                      key={company.id}
                      onClick={() => setCompanyName(company.id.toString())}
                      value={company.id.toString()}
                    >
                      {company.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* SortBy Select Option */}
            <div className={`mb-2 ${style.input}`}>
              <label
                htmlFor="underline_select"
                className="text-xs bg-bg-white absolute -mt-2 ml-1 px-1 text-dark-green"
              >
                Sort by
              </label>
              <select
                id="underline_select"
                className="block cursor-pointer text-center p-2 rounded text-sm text-dark-green bg-transparent border border-dark-green dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer w-full"
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

            {/* Release Date Range */}
            <div className={`mb-2 ${style.input}`}>
              <div className="flex flex-col">
                <small className="text-text-dark font-bold text-sm">
                  Release Date
                </small>
                <MultiRangeSlider
                  min={1875}
                  max={2025}
                  step={1}
                  minValue={minDate}
                  maxValue={maxDate}
                  ruler={false}
                  labels={[`${minDate}`, `${maxDate}`]}
                  style={{ border: "none ", boxShadow: "none", width: "100%" }}
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
            </div>

            {/* Vote Rate Range */}
            <div className={`mb-2 ${style.input}`}>
              <div className="flex flex-col">
                <small className="text-text-dark font-bold text-sm">
                  Rating
                </small>
                <MultiRangeSlider
                  min={0}
                  max={10}
                  step={0.1}
                  minValue={minRate}
                  maxValue={maxRate}
                  ruler={false}
                  labels={[`${minRate == 0 ? 0 : minRate}`, `${maxRate == 10 ? 10 : maxRate}`]}
                  style={{ border: "none ", boxShadow: "none", width: "100%" }}
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
            </div>

            {/* Genre Dropdown */}
            <div className={`mb-2 relative ${style.input}`}>
              <div
                onClick={dropdownHandler}
                className="p-1 border-b border-dark-green text-dark-green min-w-[80px] cursor-pointer flex justify-between items-center"
              >
                <small className="text-sm flex !line-clamp-1 ">
                  {genre.length == 1
                    ? getGenreNameByGenreId(+genre[0])
                    : genre.length > 1
                    ? `${getGenreNameByGenreId(
                        +genre[genre.length - 2]
                      )} , ${getGenreNameByGenreId(
                        +genre[genre.length - 1]
                      )} , ...`
                    : "Genre"}
                </small>
                <div
                  id="arrow"
                  className={`transform transition-all duration-300`}
                >
                  <BsChevronDown className="text-sm" />
                </div>
              </div>
              <div
                id="dropdown"
                className="bg-bg-white py-1.5 px-3 overflow-y-auto rounded-lg absolute z-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 opacity-0 h-0 min-w-[160px] border border-dark-green"
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
                          name={genre.id.toString()}
                          id={genre.id.toString()}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Adult Toggle */}
            <div
              className={`mb-2 flex justify-between items-center ${style.input}`}
            >
              <small className="text-sm font-bold text-text-dark">
                Include Adult
              </small>
              <Toggle toggle={adult} setToggle={setAdult} />
            </div>
          </div>

          <div
            onClick={resetHandler}
            className="w-full min-h-[48px] bg-dark-green flex justify-center items-center text-white cursor-pointer"
          >
            <BsTrash3 className="text-white text-2xl" />
          </div>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-y-6 gap-x-2 xs:gap-x-3 mt-16 lg:mt-0 mx-auto ${
            allMovies?.results?.length! < 4 && "lg:mr-auto lg:ml-0"
          }`}
        >
          {allMovies?.results?.length! > 0 ? (
            allMovies?.results?.map((result: Movie, index: number) => {
              return (
                <div
                  key={result.id}
                  className={`flex justify-center ${style.card} ${
                    allMovies?.results?.length! < 4 &&
                    "!min-w-[160px] lg:!min-w-[180px]"
                  }`}
                >
                  <MovieCard imageSize="w185" movie={result} />
                </div>
              );
            })
          ) : (
            <p>No Movies Found !</p>
          )}
        </div>
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
