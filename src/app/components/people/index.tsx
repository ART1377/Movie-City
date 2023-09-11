"use client";
import React, { useEffect, useState } from "react";
import style from "./People.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../Global/Pagination";
import { People } from "../../../../next-type-d";
import getPopularPeople from "@/app/lib/DataFetching/getPopularPeople";
import {
  makeUnique,
  sortArray,
  filterByGender,
} from "@/app/lib/Functions/Functions";
import CustomSlider from "../Global/CustomSlider";
import PersonCard from "../Global/PersonCard";
import { BsPerson, BsSearch, BsTrash3 } from "react-icons/bs";

type Props = {};
export const dynamic = 'force-dynamic'


const People = (props: Props) => {
  const [sort, setSort] = useState<string>("");
  const [gender, setGender] = useState<number>(0);
  const [total, setTotal] = useState<number>(90);

  const [allPeople, setAllPeople] = useState<any[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages = total <= 60 ? total : 60;

  // Reset Handler
  const resetHandler = () => {
    setGender(0);
    setSort("");
  };

  // Get All Data in order to implement sort
  useEffect(() => {
    async function getAllResults() {
      const initial = await getPopularPeople(+page!);
      setTotal(initial.total_pages);
      const array = Array.from({ length: totalPages! + 1 }, (v, i) => i + 1);

      array.map(async (item) => {
        const allData = await getPopularPeople(item);
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

  const lastFive: People[] = filteredAllPeople.slice(0, 5);

  const filteredByGender =
    gender == 0
      ? filteredAllPeople
      : filterByGender(filteredAllPeople, gender!);

  const data = sortArray(sort, filteredByGender);

  if (!data) {
    return <p>loading ...</p>;
  }

  return (
    <>
      {/* <div className="flex h-auto min-h-[500px]"> */}

      {/* <CustomSlider data={lastFive} /> */}
      {/* </div> */}

      <div className="bg-bg-white relative rounded-2xl w-full h-16 mb-3 overflow-hidden flex justify-between items-center max-w-[96%] lg:max-w-full lg:mb-6 mx-auto">
        <div className="flex items-center gap-2 ps-3 xs:ps-5">
          <BsSearch className="text-gray-300 text-3xl" />
          <p className="text-text-dark font-medium text-sm xxs:text-base xs:text-xl sm:text-2xl">
            Search in all
            <span className="text-main-green ml-1">Celebrities</span>
          </p>
        </div>
        <div className="bg-dark-green w-16 h-16 flex justify-center items-center">
          <BsPerson className="text-white text-2xl" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse lg:gap-2">
        <div className="bg-bg-white rounded-2xl border-b border-main-green overflow-hidden max-w-[96%] lg:h-fit lg:max-w-[240px] lg:min-w-[240px] lg:mr-2 mx-auto lg:sticky lg:top-[60px] w-full">
          <div className="text-center py-2 mb-6">
            <h6 className="text-text-dark">
              <span className="text-main-green mr-1">Advance</span>
              Search
            </h6>
          </div>
          <div
            className={`w-full flex flex-wrap justify-center items-center gap-8 mb-8 py-2 px-4 rounded-none `}
          >
            {/* FilterBy Gender */}
            <div className={`mb-2 ${style.input}`}>
              <label
                htmlFor="underline_select"
                className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-dark-green"
              >
                Gender
              </label>
              <select
                id="underline_select"
                className="block cursor-pointer text-center p-2 rounded text-sm text-dark-green bg-transparent border border-dark-green dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer w-full"
                onChange={(e) => setGender(e?.target?.value as any)}
                value={gender}
              >
                <option onClick={() => setGender(0)} value={0}>
                  none
                </option>
                <option onClick={() => setGender(1)} value={1}>
                  women
                </option>
                <option onClick={() => setGender(2)} value={2}>
                  men
                </option>
              </select>
            </div>

            {/* SortBy Select Option */}
            <div className={`mb-2 ${style.input}`}>
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

          <div
            onClick={resetHandler}
            className="w-full min-h-[48px] bg-dark-green flex justify-center items-center text-white cursor-pointer"
          >
            <BsTrash3 className="text-white text-2xl" />
          </div>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-y-6 gap-x-2 xs:gap-x-3 mt-16 lg:mt-0 mx-auto ${
            data?.length! < 4 && "lg:mr-auto lg:ml-0"
          }`}
        >
          {data?.length! > 0 ? (
            data?.map((result: People, index: number) => {
              if (index >= (+page! - 1) * 20 && index < +page! * 20) {
                return (
                  <div
                    key={result.id}
                    className={`flex justify-center ${style.card} ${
                      data?.length! < 4 && "!min-w-[160px] lg:!min-w-[180px]"
                    }`}
                  >
                    <PersonCard imageSize="w185" person={result} />
                  </div>
                );
              }
            })
          ) : (
            <p>No Celebrity Found !</p>
          )}
        </div>
      </div>
      <Pagination
        total={totalPages}
        current={+page!}
        setCurrent={setCurrentPage}
      />
    </>
  );
};

export default People;
