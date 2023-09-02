"use client";
import React from "react";
import SectionDevider from "../../Global/SectionDevider";
import { series } from "@/app/data";
import Slider from "../../Global/Slider";
import SeriesCard from "../../Global/SeriesCard";
import { SwiperSlide } from "swiper/react";
import { Movie } from "../../../../../next-type-d";
import MovieCard from "../../Global/MovieCard";

type Props = {
  data: Movie[];
};

const TrendingMovies = ({ data }: Props) => {
  return (
    <>
      <section className="mb-12">
        <SectionDevider title="Trending Movies" path="/movie/trendingmovies/?page=1" />
        <Slider>
          {data.map((item: Movie) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard movie={item} imageSize="w185" />
              </SwiperSlide>
            );
          })}
        </Slider>
      </section>
    </>
  );
};

export default TrendingMovies;
