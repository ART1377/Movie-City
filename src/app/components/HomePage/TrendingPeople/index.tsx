"use client";
import React from "react";
import SectionDevider from "../../Global/SectionDevider";
import Slider from "../../Global/Slider";
import { SwiperSlide } from "swiper/react";
import PersonCard from "../../Global/PersonCard";
import { People } from "../../../../../next-type-d";
import { motion } from "framer-motion";
import { scaleOpacity } from "../../../animations/animation";

type Props = {
  data: People[];
};

const TrendingPeople = ({ data }: Props) => {
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
          title="Trending People"
          path="/people/trendingpeople/?page=1"
        />
        <Slider>
          {data.map((item: People) => {
            return (
              <SwiperSlide key={item.id}>
                <PersonCard person={item} imageSize="w154" />
              </SwiperSlide>
            );
          })}
        </Slider>
      </motion.section>
    </>
  );
};

export default TrendingPeople;
