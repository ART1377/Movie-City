"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../../Global/Pagination";
import { People } from "../../../../../next-type-d";
import getTrendingPeople from "@/app/lib/DataFetching/getTrendingPeople";
import Title from "../../Global/Title";
import {
  makeUnique,
  sortAlphabatically,
} from "@/app/lib/Functions/Functions";
import CustomSlider from "../../Global/CustomSlider";
import PersonCard from "../../Global/PersonCard";

type Props = {};

const TrendingPeoplePage = (props: Props) => {
  const [sort, setSort] = useState<string>("none");
  const [total, setTotal] = useState<number>(102);

  const [allPeople, setAllPeople] = useState<any[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages = Math.ceil(total / 10) - 5;

  // Get All Data in order to implement sort
  useEffect(() => {
    async function getAllResults() {
      const initial = await getTrendingPeople(+page!);
      setTotal(initial.total_pages);
      const array = Array.from({ length: totalPages! }, (v, i) => i + 1);

      array.map(async (item) => {
        const allData = await getTrendingPeople(item);
        setAllPeople((prev: any) => [...prev, ...allData.results]);
      });
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

  const filteredAllPeople = makeUnique(allPeople);

  // totalPages = Math.floor(allTrendingSeries.length/20);

  // console.log(Math.floor(filteredAllPeople.length/20))

  const lastFive: People[] = filteredAllPeople.slice(0, 5);

  const data =
    sort == "alphabet"
      ? sortAlphabatically(filteredAllPeople)
      : filteredAllPeople;

  if (!data) {
    return <p>loading ...</p>;
  }

  return (
    <>
      {/* <div className="flex h-auto min-h-[500px]"> */}

      {/* <CustomSlider data={lastFive} /> */}
      {/* </div> */}

      <div className="w-full flex justify-between items-center gap-8 border-b border-main-green mt-8 mb-4 pb-1 ps-2 sm:ps-4">
        <Title>Trending People</Title>
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
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4 mx-auto">
        {data?.map((result: People, index: number) => {
          if (index >= (+page! - 1) * 20 && index < +page! * 20) {
            return (
              <div key={result.id} className="max-w-[150px] sm:min-w-[180px]">
                <PersonCard imageSize="w185" person={result} />
              </div>
            );
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

export default TrendingPeoplePage;
