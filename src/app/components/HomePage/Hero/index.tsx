"use client";
import React, { useEffect, useState } from "react";
import style from "./Hero.module.css";
import { series } from "@/app/data";
import { Series } from "../../../../../next-type-d";
import { BsStarFill } from "react-icons/bs";
import Link from "next/link";
import Img from "@/app/components/Global/Img";
import getGenreNameByGenreId from "@/app/lib/DataFetching/getGenreNameByGenreId";
import { motion } from "framer-motion";
import {
  heroContainer,
  heroInfo,
  heroSmallImages,
} from "../../../animations/animation";

type Props = {};

const SliderHero = (props: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const setSlider = setInterval(() => {
      setCurrent((prev) => {
        if (prev == 2) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);

    return () => {
      clearInterval(setSlider);
    };
  }, [current]);

  const changeSlide = (value: number) => {
    setCurrent(value);
  };

  return (
    <>
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="h-[520px] xxs:h-[570px] xs:h-[700px] sm:h-[800px] md:h-[550px] 2xl:h-[750px] mb-10 xs:mb-[90px] sm:mb-10 md:mb-16"
      >
        <div className={`relative h-full sm:h-[65%] md:h-full ${style.slider}`}>
          <div className={`relative w-full h-[65%] sm:h-full ${style.image}`}>
            <Link
              href={`/series/${series[current].id}`}
              className={style.overlay}
            ></Link>
            <Link
              href={`/series/${series[current].id}`}
              className="cursor-pointer"
            >
              <Img
                url={series[current]?.backdrop_path}
                alternative={`${series[current]?.name} image`}
                size="original"
              />
            </Link>
            {/* information //////////////// */}
            <motion.div
              variants={heroInfo}
              className={`w-full z-20 p-4 xxs:p-5 sm:p-6 xl:p-8 absolute bottom-0 ${style.info}`}
            >
              <Link href={`/series/${series[current].id}`}>
                <h5 className="text-header-color inline lg:text-5xl xs:text-3xl">
                  {series[current]?.name}
                </h5>
              </Link>
              <div className={` ${style.detail}`}>
                <ul className={`flex gap-1 items-center`}>
                  <li className="font-bold flex items-center text-header-color">
                    <BsStarFill className="text-sm text-main-green me-0.5" />
                    <small className="!text-lg text-main-green">
                      {series[current]?.vote_average.toFixed(1)}
                    </small>
                  </li>
                  <div className={`mr-1 ml-0.5 ${style.divider}`}></div>
                  <li className="flex items-center text-header-color">
                    <small>
                      {series[current]?.first_air_date?.split("-")[0]}
                    </small>
                  </li>
                  <div className={`mr-1 ml-0.5 ${style.divider}`}></div>
                  <li className="items-center gap-1 my-2">
                    {series[current]?.genre_ids.map(
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

                <li className="flex items-start gap-1 !text-sm xs:my-1 ">
                  <small className="!line-clamp-1 xs:!line-clamp-2 max-w-[480px] xm:!max-w-[330px] xl:!max-w-[520px] text-header-color !text-sm">
                    {series[current]?.overview}
                  </small>
                </li>
              </div>
            </motion.div>
          </div>

          {/* small images //////////////// */}
          <div
            className={`flex gap-2 mt-3 justify-around md:absolute md:bottom-[18%] xm:bottom-8 xm:right-4 md:right-1 z-30 ${style.smallImages}`}
          >
            {series?.map((item: Series, index: number) => {
              return (
                <motion.div
                  variants={heroSmallImages}
                  key={item.id}
                  onClick={() => changeSlide(index)}
                  className={`relative w-[30%] max-h-[250px] max-w-[180px] md:max-w-[100px] lg:max-w-[120px] z-30 cursor-pointer lg:mx-2 ${
                    index == current ? style.slide : style.other
                  }`}
                >
                  <Img
                    url={item?.poster_path}
                    alternative={`${item?.name} image`}
                    size="w500"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SliderHero;
