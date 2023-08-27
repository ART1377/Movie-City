"use client";
import React, { useEffect, useState } from "react";
import style from "./TopRatedSeries.module.css";
import { Series } from "../../../../../next-type-d";
import SectionDevider from "../../Global/SectionDevider";
import Link from "next/link";
import Img from "../../Global/Img";
import getGenreNameByGenreId from "@/app/lib/getGenreNameByGenreId";

type Props = {
  data: Series[];
};

const TopRatedSeries = ({ data }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const setSlider = setInterval(() => {
      setCurrent((prev) => {
        if (prev == 4) {
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

  const topFive = data.slice(0, 5);

  return (
    <>
      <section className="mb-12">
        <SectionDevider title="TopRated Series" path="/" />
        <div
          className={`flex flex-col mx-auto justify-center sm:flex-row sm:justify-around gap-4 py-4 xxs:px-2 sm:px-4 max-w-[450px] sm:max-w-full ${style.container}`}
        >
          <div className={`w-full sm:w-5/12 my-auto relative ${style.image}`}>
            <Link href={"/"}>
              <Img
                url={topFive[current]?.poster_path}
                alternative={`${topFive[current]?.name} image`}
                size="w780"
              />
            </Link>
          </div>
          <div className={`w-full sm:w-6/12 my-auto space-y-4 ${style.info}`}>
            {topFive?.map((item: Series, index: number) => {
              return (
                <div
                  key={item.id}
                  onClick={() => changeSlide(index)}
                  className={`flex items-center justify-between sm:pe-1 cursor-pointer ${
                    index == current ? style.current : style.other
                  }`}
                >
                  <div>
                    <Link
                      href={"/"}
                      className={`text-text-dark font-semibold ${style.name}`}
                    >
                      {item.name?.split(":")[0]}
                    </Link>
                    <div className="flex">
                      {item?.genre_ids.map((genreId: number, index: number) => {
                        if (index < 2) {
                          return (
                            <Link href={"/"} key={genreId}>
                              <small className="text-sm text-text-dark opacity-80">
                                {getGenreNameByGenreId(genreId)}
                                {index < 1 && <hr />}
                              </small>
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-text-dark opacity-80">
                      {item.first_air_date}
                    </p>
                    <p className="text-text-dark opacity-80">
                      rate : {item.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TopRatedSeries;
