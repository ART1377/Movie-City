"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../Global/Pagination";
import Title from "../Global/Title";
import { useAppSelector } from "@/app/redux/hooks/hook";
import getMovies from "@/app/lib/DataFetching/getMovies";
import getSeries from "@/app/lib/DataFetching/getSeries";
import FavoriteCard from "../Favorites/FavoriteCard/index";
import { useRouter, useSearchParams } from "next/navigation";
import { Series,Movie } from "../../../../next-type-d";

type Props = {
  genreId: number;
  genreName:string;
};

const Genres = ({ genreId ,genreName}: Props) => {
  const [category, setCategory] = useState<string>("movies");
  const [sort, setSort] = useState<string>("");
  const [allData, setAllData] = useState<Series[]|Movie[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(+page!);
  const [total, setTotal] = useState(5);

  useEffect(() => {
    async function getData() {
      if (category == "movies") {
        const results = await getMovies(+page!, genreId.toString(),sort);
        setAllData(results?.results)
        setTotal(results.total_pages)
      } 
      if(category=='series') {
        const results = await getSeries(+page!, genreId.toString(),sort);
        setAllData(results?.results)
        setTotal(results.total_pages)
      }
    }
    getData();
  }, [category, genreId, page,sort]);

  return (
    <>
      <Title>{`'${genreName}' ${category}`}</Title>

      <div className="w-full flex gap-8 border-b border-main-green mt-8 mb-4 pb-2 ps-2 sm:ps-4 justify-between items-center me-3">
        <div className=" flex items-center gap-6">
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
        </div>
        <div>
          {/* SortBy Select Option */}
          <div className={``}>
              <label
                htmlFor="underline_select"
                className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-dark-green"
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
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 mx-auto w-full">
        {!(allData?.length>0)&&(<p>{`no ${category} with genre ${genreName}!`}</p>)}
        {allData?.map((item, index: number) => {
          if (index >= (+page! - 1) * 20 && index < +page! * 20) {
            return (
              <FavoriteCard key={item.id} data={item} count={allData?.length} searchItem />
            );
          }
        })}
      </div>
      <Pagination
        total={total}
        current={+page!}
        setCurrent={setCurrentPage}
      />
    </>
  );
};

export default Genres;
