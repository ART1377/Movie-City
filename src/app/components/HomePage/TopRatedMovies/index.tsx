"use client";
import React, { useEffect, useState } from "react";
import style from "./TopRatedMovies.module.css";
import { Movie } from "../../../../../next-type-d";
import SectionDevider from "../../Global/SectionDevider";
import Link from "next/link";
import Img from "../../Global/Img";
import getGenreNameByGenreId from "@/app/lib/DataFetching/getGenreNameByGenreId";
import { motion } from "framer-motion";
import { scaleOpacity } from "../../../animations/animation";

type Props = {
  data: Movie[];
};

const TopRatedMovies = ({ data }: Props) => {
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
      <motion.section
        variants={scaleOpacity}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-12"
      >
        <SectionDevider
          title="TopRated Movies"
          path="/movie/topratedmovies/?page=1"
        />
        <div
          className={`flex flex-col mx-auto justify-center sm:flex-row-reverse sm:justify-around gap-4 py-4 xxs:px-2 sm:px-4 max-w-[400px] sm:max-w-[1000px] ${style.container}`}
        >
          <div className={`w-full sm:w-5/12 m-auto relative ${style.image}`}>
            <Link href={`/movie/${topFive[current].id}`}>
              <Img
                url={topFive[current]?.poster_path}
                alternative={`${topFive[current]?.title} image`}
                size="w780"
              />
            </Link>
          </div>
          <div className={`w-full sm:w-6/12 my-auto space-y-4 ${style.info}`}>
            {topFive?.map((item: Movie, index: number) => {
              return (
                <div
                  key={item.id}
                  onClick={() => changeSlide(index)}
                  className={`flex items-center justify-between sm:pe-1 cursor-pointer ${
                    index == current ? style.current : style.other
                  }`}
                >
                  <div>
                    <p className={`text-text-dark font-semibold ${style.name}`}>
                      {item.title}
                    </p>
                    <div className="flex">
                      {item?.genre_ids.map((genreId: number, index: number) => {
                        if (index < 2) {
                          return (
                            <small
                              key={genreId}
                              className="text-sm text-text-dark opacity-80"
                            >
                              {getGenreNameByGenreId(genreId)}
                              {index < 1 && <hr />}
                            </small>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-text-dark opacity-80">
                      {item.release_date}
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
      </motion.section>
    </>
  );
};

export default TopRatedMovies;
