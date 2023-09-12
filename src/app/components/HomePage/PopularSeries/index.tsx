"use client";
import React from "react";
import { Series } from "../../../../../next-type-d";
import SectionDevider from "../../Global/SectionDevider";
import Slider from "../../Global/Slider";
import { SwiperSlide } from "swiper/react";
import SeriesCard from "../../Global/SeriesCard";
import { motion } from "framer-motion";
import { scaleOpacity } from "../../../animations/animation";

type Props = {
  data: Series[];
};

const PopularSeries = ({ data }: Props) => {
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
          title="Popular Series"
          path="/series/popularseries/?page=1"
        />
        <Slider>
          {data.map((item: Series, index: number) => {
            if (index < 10) {
              return (
                <SwiperSlide key={item.id}>
                  <SeriesCard series={item} imageSize="w185" />
                </SwiperSlide>
              );
            }
          })}
        </Slider>
      </motion.section>
    </>
  );
};

export default PopularSeries;
