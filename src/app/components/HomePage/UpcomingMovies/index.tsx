"use client";
import React from "react";
import { Movie } from "../../../../../next-type-d";
import SectionDevider from "../../Global/SectionDevider";
import Slider from "../../Global/Slider";
import { SwiperSlide } from "swiper/react";
import MovieCard from "../../Global/MovieCard";

type Props = {
  data: Movie[];
};

const UpcomingMovies = ({ data }: Props) => {
  return (
    <>
      <section className="mb-12">
        <SectionDevider title="Upcoming Movies" path="/movie/upcomingmovies/?page=1" />
        <Slider>
          {data.map((item: Movie, index: number) => {
            if (index < 10) {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard movie={item} imageSize="w185" />
                </SwiperSlide>
              );
            }
          })}
        </Slider>
      </section>
    </>
  );
};

export default UpcomingMovies;
