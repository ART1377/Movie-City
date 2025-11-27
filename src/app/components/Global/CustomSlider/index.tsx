import React, { useEffect, useState } from "react";
import style from "./CustomSlider.module.css";
import Img from "../Img";
import { BsChevronLeft, BsChevronRight, BsStarFill } from "react-icons/bs";
import Link from "next/link";
import getGenreNameByGenreId from "@/app/lib/DataFetching/getGenreNameByGenreId";

type Props = {
  data: any[];
};


const CustomSlider = ({ data }: Props) => {
  const [current, setCurrent] = useState<number>(1);
  
  useEffect(() => {
    const setSlider = setInterval(() => {
      setCurrent((prev) => {
        if (prev == 5) {
          return 1;
        } else {
          return prev + 1;
        }
      });
    }, 5000);
    
    return () => {
      clearInterval(setSlider);
    };
  }, [current]);

  const prev = +current == 1 ? 5 : +current - 1;
  const next = +current == 5 ? 1 : +current + 1;

  const prev2 = +current == 1 ? 5 - 1 : +current == 2 ? 5 : +current - 2;
  const next2 = +current == 5 ? 2 : +current == 5 - 1 ? 1 : +current + 2;

  const mediaType = data[0]?.gender
    ? "people"
    : data[0]?.first_air_date
    ? "series"
    : "movie";

  return (
    <>
      <div className="relative mb-36 xxs:mb-40 sm:mb-48 lg:mb-56">
        <div
          id="info"
          className={`absolute left-1/2 top-2 sm:top-3 transform -translate-x-1/2 w-[95%] max-w-[870px] z-[5] ${style.info}`}
        >
          <h6
            className={`text-header-color text-base xs:text-lg sm:text-xl lg:text-2xl`}
          >
            {data[current - 1]?.name
              ? data[current - 1]?.name
              : data[current - 1]?.title}
          </h6>
          <div className={` ${style.detail}`}>
            <ul className={`flex gap-1 items-center -mt-2 xxs:-mt-1 xs:mt-0`}>
              <li className="font-bold flex items-center text-header-color">
                <BsStarFill className="text-sm text-main-green me-0.5" />
                <small className="!text-lg text-main-green">
                  {data[current - 1]?.vote_average.toFixed(1)}
                </small>
              </li>
              <li className="items-center gap-1 my-2">
                {data[current - 1]?.genre_ids.map(
                  (genreId: number, index: number) => {
                    if (index < 2) {
                      return (
                        <Link
                          href={`/genres/${getGenreNameByGenreId(
                            genreId
                          )}?page=1`}
                          key={genreId}
                        >
                          <small className="!text-xs lg:text-sm text-header-color">
                            {getGenreNameByGenreId(genreId)}
                            {index < 1 && <hr />}
                          </small>
                        </Link>
                      );
                    }
                  }
                )}
              </li>
            </ul>

            <li className="flex items-start gap-1 !text-sm xs:my-1">
              <small className="!line-clamp-1 xs:!line-clamp-2 max-w-[480px] xm:!max-w-[330px] xl:!max-w-[520px] text-header-color !text-sm">
                {data[current - 1]?.overview}
              </small>
            </li>
          </div>
        </div>

        <Link
          href={`/${mediaType}/${data[current]?.id}`}
          className={`${style.background}`}
          id="background"
        >
          <Img
            url={
              data[current - 1]?.backdrop_path
                ? data[current - 1]?.backdrop_path
                : data[current - 1]?.profile_path
            }
            alternative="image"
            style={`max-h-[400px] max-w-[900px] mx-auto rounded-2xl`}
          />
        </Link>
        <div
          className={`${style.slider} w-full h-full flex justify-center items-end absolute left-1/2 -bottom-[65%] xxs:-bottom-[39%] xs:-bottom-[30%] sm:-bottom-[30%] md:-bottom-[35%] xm:-bottom-[25%] transform -translate-x-1/2 z-10`}
        >
          {data.map((item: any, index: number) => {
            return (
              <div
                key={item.id}
                onClick={() => setCurrent(index + 1)}
                className={`absolute w-fit rounded-2xl cursor-pointer  
              ${index + 1 == current && "shadow-2xl"} 
              ${
                index + 1 == current
                  ? style.current
                  : index + 1 == prev
                  ? style.prev
                  : index + 1 == next
                  ? style.next
                  : index + 1 == next2
                  ? style.next2
                  : index + 1 == prev2
                  ? style.prev2
                  : "hidden"
              } `}
              >
                <div className="relative rounded-2xl overflow-hidden w-[100px] h-[140px] xxs:w-[120px] xxs:h-[170px] xs:w-[140px] xs:h-[190px] sm:w-[180px] sm:h-[230px]">
                  <Img
                    url={
                      item?.poster_path!
                        ? item?.poster_path!
                        : item.profile_path
                    }
                    alternative={`${item.name ? item.name : item.title} Poster`}
                    size="w185"
                    style="w-full h-full"
                  />
                </div>
              </div>
            );
          })}
          {/* Arrow For Slider Navigation */}
          <div className="absolute -bottom-[22%] xs:-bottom-[13%] flex gap-5">
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
      </div>
    </>
  );
};

export default CustomSlider;
