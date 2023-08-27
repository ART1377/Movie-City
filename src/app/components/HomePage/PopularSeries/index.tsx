"use client";
import React from "react";
import { Series } from "../../../../../next-type-d";
import SectionDevider from "../../Global/SectionDevider";
import Slider from "../../Global/Slider";
import { SwiperSlide } from "swiper/react";
import SeriesCard from "../../Global/SeriesCard";

type Props = {
  data: Series[];
};

const PopularSeries = ({ data }: Props) => {
  return (
    <>
      <section className="mb-12">
        <SectionDevider title="Popular Series" path="/" />
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
      </section>
    </>
  );
};

export default PopularSeries;
