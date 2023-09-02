"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Season, SeasonDetail } from "../../../../../../next-type-d";
import Img from "@/app/components/Global/Img";
import style from "./SeasonDetail.module.css";
import Episode from "../Episode";
import getSeasonDetailById from "@/app/lib/DataFetching/getSeasonDetailById";
import { BsFillStarFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Props = {
  data: Season[];
  id: number;
};

const SeasonDetail = ({ data, id }: Props) => {
  
  const [current, setCurrent] = useState<number>(1);
  const [seasonData, setSeasonData] = useState<SeasonDetail>();

  // Get Series Episodes based on Season number
  useEffect(() => {
    async function getSeasonDetail() {
      const seasonDetail = await getSeasonDetailById(id, current);
      setSeasonData(seasonDetail);
    }
    getSeasonDetail();
  }, [current, id]);

  const newArray = data.filter(
    (item) => !item.name.toLowerCase().includes("special")
  );

  const prev = +current == 1 ? +newArray.length : +current - 1;
  const next = +current == +newArray.length ? 1 : +current + 1;

  const prev2 =
    +current == 1
      ? +newArray.length - 1
      : +current == 2
      ? +newArray.length
      : +current - 2;
  const next2 =
    +current == +newArray.length
      ? 2
      : +current == +newArray.length - 1
      ? 1
      : +current + 2;

  return (
    <>
      <div className="mb-3 flex justify-center">
        <label htmlFor="underline_select" className="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          className="block text-center py-1.5 px-2 w-fit text-sm text-main-green bg-transparent border-0 border-b-2 border-main-green dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer"
          onChange={(e) => setCurrent(+e?.target?.value as any)}
          value={current}
        >
          {newArray.map((season: Season) => {
            return (
              <option key={season.id} value={season.season_number}>
                {season.name}
              </option>
            );
          })}
        </select>
      </div>
      <div
        className={`w-full h-auto min-h-[260px] sm:min-h-[320px] relative flex justify-center ${style.slider}`}
      >
        {newArray.map((season: Season,index:number) => {
          if (!season.season_number) {
            return;
          }
          return (
            <div
              key={season.id}
              onClick={() => setCurrent(index+1)}
              className={`absolute w-fit rounded-2xl cursor-pointer  
              ${season.season_number == current && "shadow-2xl"} 
              ${
                season.season_number == current
                  ? style.current
                  : season.season_number == prev
                  ? style.prev
                  : season.season_number == next
                  ? style.next
                  : season.season_number == next2
                  ? style.next2
                  : season.season_number == prev2
                  ? style.prev2
                  : "hidden"
              } `}
            >
              <div className="relative rounded-2xl overflow-hidden w-[100px] h-[140px] xxs:w-[120px] xxs:h-[170px] xs:w-[140px] xs:h-[190px] sm:w-[180px] sm:h-[230px] lg:w-[200px] lg:h-[260px] ">
                <Img
                  url={season?.poster_path!}
                  alternative={`${season.name} Poster`}
                  size="w342"
                  style="w-full h-full"
                />
              </div>
            </div>
          );
        })}
        <div className="absolute bottom-[27%] xxs:bottom-[23%] xs:bottom-[14%] lg:bottom-[8%] flex gap-5">
          <div
            onClick={() => setCurrent(prev)}
            className="text-lg text-main-green cursor-pointer"
          >
            <BsChevronLeft strokeWidth="3" />
          </div>
          <div
            onClick={() => setCurrent(next)}
            className="text-lg text-main-green cursor-pointer"
          >
            <BsChevronRight strokeWidth="3" />
          </div>
        </div>
      </div>

      <ul
        className={`flex items-center justify-center gap-3 xxs:gap-4 sm:gap-8 mb-6 px-4 text-text-dark ${style.detail}`}
      >
        <li>
          <div className={style.devider}></div>
          <p>{newArray[current - 1].name}</p>
        </li>
        <li>
          <div className={style.devider}></div>
          <p className="flex items-center gap-1 ">
            {newArray[current - 1].episode_count}
            episode
          </p>
        </li>
        <li>
          <div className={style.devider}></div>
          <p className="flex items-center">
            <BsFillStarFill className="text-main-green" />
            {newArray[current - 1].vote_average.toFixed(1)}
          </p>
        </li>
      </ul>

      <Suspense fallback={<p>Loading Episodes...</p>}>
        <Episode data={seasonData!} />
      </Suspense>
    </>
  );
};

export default SeasonDetail;
