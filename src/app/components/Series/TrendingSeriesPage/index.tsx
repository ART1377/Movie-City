"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../../Global/Pagination";
import { Series, SeriesList } from "../../../../../next-type-d";
import getTrendingSeries from "@/app/lib/DataFetching/getTrendingSeries";
import SeriesCard from "../../Global/SeriesCard";
import Title from "../../Global/Title";
import {
  makeUnique,
  sortAscending,
  sortDescending,
  sortAlphabatically,
} from "@/app/lib/Functions/Functions";

type Props = {};

const TrendingSeriesPage = (props: Props) => {
  const [sort, setSort] = useState<string>("none");
  const [allTrendingSeries, setAllTrendingSeries] = useState<any[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<SeriesList>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages = trendingSeries?.total_pages! / 10;

  useEffect(() => {
    async function getResults() {
      const data = await getTrendingSeries(+page!);
      setTrendingSeries(data);
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
  }, [page, router, currentPage]);

  // Get All Data in order to implement sort
  useEffect(() => {
    async function getAllResults() {
      const array = Array.from({ length: totalPages! }, (v, i) => i + 1);

      array.map(async (item) => {
        const allData = await getTrendingSeries(item);
        setAllTrendingSeries((prev: any) => [...prev, ...allData.results]);
      });
    }
    getAllResults();
  }, [totalPages]);

  const filteredAllTrendingSeries = makeUnique(allTrendingSeries);
//   totalPages = Math.floor(filteredAllTrendingSeries.length/20);

// console.log(Math.floor(filteredAllTrendingSeries.length/20))

  const data =
    sort == "alphabet"
      ? sortAlphabatically(filteredAllTrendingSeries)
      : sort == "rate dec."
      ? sortDescending(filteredAllTrendingSeries)
      : sort == "rate asc."
      ? sortAscending(filteredAllTrendingSeries)
      : trendingSeries?.results;

  if (!data) {
    return <p>loading ...</p>;
  }

  return (
    <>
      <div className="w-full flex justify-between items-center gap-8 border-b border-main-green mt-8 mb-4 pb-1 ps-2 sm:ps-4">
        <Title>Trending Series</Title>
        <div className="-mb-2">
          <label
            htmlFor="underline_select"
            className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-main-green"
          >
            Sort by
          </label>
          <select
            id="underline_select"
            className="block cursor-pointer text-center py-2 px-3 rounded w-fit text-sm text-dark-green bg-transparent border border-main-green  dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer"
            onChange={(e) => setSort(e?.target?.value as any)}
            value={sort}
          >
            <option onClick={() => setSort("none")} value={"none"}>
              none
            </option>
            <option onClick={() => setSort("alphabet")} value={"alphabet"}>
              alphabet
            </option>
            <option onClick={() => setSort("rate asc.")} value={"rate asc."}>
              rate asc.
            </option>
            <option onClick={() => setSort("rate dec.")} value={"rate dec."}>
              rate dec.
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4 mx-auto">
        {data?.map((result: Series, index: number) => {
          if (sort == "none") {
            return (
              <div key={result.id} className="max-w-[150px] sm:min-w-[180px]">
                <SeriesCard imageSize="w185" series={result} />
              </div>
            );
          }
          if (sort != "none") {
            if (index >= (+page! - 1) * 20 && index < +page! * 20) {
              return (
                <div key={result.id} className="max-w-[150px] sm:min-w-[180px]">
                  <SeriesCard imageSize="w185" series={result} />
                </div>
              );
            }
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

export default TrendingSeriesPage;
