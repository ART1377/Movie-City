"use client";
import React from "react";
import { Movie } from "../../../../../next-type-d";
import SectionDevider from "../../Global/SectionDevider";
import Slider from "../../Global/Slider";
import { SwiperSlide } from "swiper/react";
import MovieCard from "../../Global/MovieCard";
import { motion } from "framer-motion";
import { scaleOpacity } from "../../../animations/animation";

type Props = {
  data: Movie[];
};

const UpcomingMovies = ({ data }: Props) => {
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
          title="Upcoming Movies"
          path="/movie/upcomingmovies/?page=1"
        />
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
      </motion.section>
    </>
  );
};

export default UpcomingMovies;
