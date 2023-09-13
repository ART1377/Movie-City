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
  sortArray,
  sortAscendingBasedPopularity,
  sortDescendingBasedPopularity,
} from "@/app/lib/Functions/Functions";
import CustomSlider from "../../Global/CustomSlider";
import PersonCard from "../../Global/PersonCard";

type Props = {};

const TrendingPeoplePage = (props: Props) => {
  const [sort, setSort] = useState<string>("");
  const [total, setTotal] = useState<number>(95);

  const [allPeople, setAllPeople] = useState<any[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages = total <= 10 ? total : 10;

  // Get All Data in order to implement sort
  useEffect(() => {
    async function getAllResults() {
      const initial = await getTrendingPeople(+page!);
      setTotal(initial.total_pages);
      const array = Array.from({ length: totalPages! + 1 }, (v, i) => i + 1);

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

  // const lastFive: People[] = filteredAllPeople.slice(0, 5);

  const data = sortArray(sort, filteredAllPeople);

  if (!data) {
    return <p>loading ...</p>;
  }

  return (
    <>
      {/* <div className="flex h-auto min-h-[500px]"> */}

      {/* <CustomSlider data={lastFive} /> */}
      {/* </div> */}

      <div className="w-full flex justify-between items-center gap-8 border-b border-main-green mt-8 mb-4 pb-1 sm:ps-4">
        <Title>Trending People</Title>
        <div className="-mb-2 me-2">
          <label
            htmlFor="underline_select"
            className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-dark-green"
          >
            Sort by
          </label>
          <select
            id="underline_select"
            className="block cursor-pointer text-center p-2 rounded w-fit text-sm text-dark-green bg-transparent border border-dark-green  dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer"
            onChange={(e) => setSort(e?.target?.value as any)}
            value={sort}
          >
            <option onClick={() => setSort("")} value={""}>
              none
            </option>
            <option onClick={() => setSort("alphabet")} value={"alphabet"}>
              alphabet
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
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-y-6 gap-x-2 xs:gap-x-3 mt-16 lg:mt-0 mx-auto">
        {data?.map((result: People, index: number) => {
          if (index >= (+page! - 1) * 20 && index < +page! * 20) {
            return (
              <div
                key={result.id}
                className="flex justify-center w-[260px] min-w-[152px] xxs:w-[48%] xxs:max-w-[180px] xs:w-[180px] s:w-[30%] lg:w-[23%]"
              >
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
