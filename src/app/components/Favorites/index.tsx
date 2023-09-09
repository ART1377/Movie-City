"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../Global/Pagination";
import Title from "../Global/Title";
import { useAppSelector } from "@/app/redux/hooks/hook";
import getMovieDetailById from "@/app/lib/DataFetching/getMovieDetailById";
import getSeriesDetailById from "@/app/lib/DataFetching/getSeriesDetailById";
import getPeopleDetailById from "@/app/lib/DataFetching/getPeopleDetailById";
import {
  MovieDetail,
  PeopleDetail,
  SeriesDetail,
} from "../../../../next-type-d";

import FavoriteCard from "./FavoriteCard";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

const Favorites = (props: Props) => {
  const [category, setCategory] = useState<string>("movies");
  const [allFavoriteMovies, setAllFavoriteMovies] = useState<MovieDetail[]>([]);
  const [allFavoriteSeries, setAllFavoriteSeries] = useState<SeriesDetail[]>(
    []
  );
  const [allFavoritePeople, setAllFavoritePeople] = useState<PeopleDetail[]>(
    []
  );

  // Use Favorite Slice
  const favoriteList = useAppSelector((state) => state.favorite);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const categoryQuery = searchParams.get("category");

  const allIDs =
    category == "movies"
      ? favoriteList.favoriteMovies
      : category == "series"
      ? favoriteList.favoriteSeries
      : favoriteList.favoritePeople;

  useEffect(() => {
    async function getData() {
      setAllFavoriteMovies([]);
      setAllFavoriteSeries([]);
      setAllFavoritePeople([]);
      allIDs.map(async (id: number) => {
        if (category == "movies") {
          const results = await getMovieDetailById(id);
          setAllFavoriteMovies((prev: MovieDetail[]) => [...prev, results]);
        } else if (category == "series") {
          const results = await getSeriesDetailById(id);
          setAllFavoriteSeries((prev: SeriesDetail[]) => [...prev, results]);
        } else {
          const results = await getPeopleDetailById(id);
          setAllFavoritePeople((prev: PeopleDetail[]) => [...prev, results]);
        }
      });
    }
    getData();
  }, [allIDs, category]);

  const showData =
    category == "movies"
      ? allFavoriteMovies
      : category == "series"
      ? allFavoriteSeries
      : allFavoritePeople;

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages = Math.ceil(showData.length/20);

  useEffect(() => {
    // Change Query by Pagination
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", currentPage.toString());
    searchParams.set("category", category);
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathName);
  }, [totalPages, page, router, currentPage,category]);

  return (
    <>
      <Title>{category == "" ? "All Favorites" : `Favorite ${category}`}</Title>

      <div className="w-full flex gap-8 border-b border-main-green mt-8 mb-4 pb-2 ps-2 sm:ps-4">
        <small
          className={`${
            category == "movies" && "border-t border-main-green text-main-green"
          } pt-1 xxs:text-sm sm:text-base hover:text-main-green transition-all duration-300 cursor-pointer`}
          onClick={() => setCategory("movies")}
        >
          movies
        </small>
        <small
          className={`${
            category == "series" && "border-t border-main-green text-main-green"
          } pt-1 xxs:text-sm sm:text-base hover:text-main-green transition-all duration-300 cursor-pointer`}
          onClick={() => setCategory("series")}
        >
          series
        </small>
        <small
          className={`${
            category == "people" && "border-t border-main-green text-main-green"
          } pt-1 xxs:text-sm sm:text-base hover:text-main-green transition-all duration-300 cursor-pointer`}
          onClick={() => setCategory("people")}
        >
          people
        </small>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 mx-auto w-full">
        {showData?.map((item, index: number) => {
          if (index >= (+page! - 1) * 20 && index < +page! * 20) {
            return <FavoriteCard key={item.id} data={item} count={showData.length} />;
          }
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

export default Favorites;
