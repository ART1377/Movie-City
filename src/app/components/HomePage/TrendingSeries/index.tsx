"use client";
import React from "react";
import SectionDevider from "../../Global/SectionDevider";
import Slider from "../../Global/Slider";
import SeriesCard from "../../Global/SeriesCard";
import { SwiperSlide } from "swiper/react";
import { Series } from "../../../../../next-type-d";
import { motion } from "framer-motion";
import { scaleOpacity } from "../../../animations/animation";

type Props = {
  data: Series[];
};

const TrendingSeries = ({ data }: Props) => {
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
          title="Trending Series"
          path="/series/trendingseries/?page=1"
        />
        <Slider>
          {data?.map((item: Series) => {
            return (
              <SwiperSlide key={item.id}>
                <SeriesCard series={item} imageSize="w154" />
              </SwiperSlide>
            );
          })}
        </Slider>
      </motion.section>
    </>
  );
};

export default TrendingSeries;
