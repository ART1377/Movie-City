"use client";
import React from "react";
import SectionDevider from "../../Global/SectionDevider";
import Slider from "../../Global/Slider";
import { SwiperSlide } from "swiper/react";
import { Movie } from "../../../../../next-type-d";
import MovieCard from "../../Global/MovieCard";
import { motion } from "framer-motion";
import { scaleOpacity } from "../../../animations/animation";

type Props = {
  data: Movie[];
};

const TrendingMovies = ({ data }: Props) => {
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
          title="Trending Movies"
          path="/movie/trendingmovies/?page=1"
        />
        <Slider>
          {data.map((item: Movie) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard movie={item} imageSize="w185" />
              </SwiperSlide>
            );
          })}
        </Slider>
      </motion.section>
    </>
  );
};

export default TrendingMovies;
