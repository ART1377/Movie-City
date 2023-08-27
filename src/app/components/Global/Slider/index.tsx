"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./style.css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

type Props = {
  children: React.ReactNode;
  slideCount?: number;
};
// interface SlidesPerView {
//   0: number;
//   480: number;
//   800: number;
//   1024: number;
// }

export default function Slider({ children, slideCount }: Props) {
  return (
    <>
      <Swiper
        slidesPerView={slideCount ? slideCount : 1.5}
        spaceBetween={8}
        navigation={true}
        breakpoints={{
          300: {
            slidesPerView: slideCount ? slideCount + 0.2 : 1.7,
          },
          320: {
            slidesPerView: slideCount ? slideCount + 0.3 : 1.8,
          },
          360: {
            slidesPerView: slideCount ? slideCount + 0.4 : 2,
          },
          400: {
            slidesPerView: slideCount ? slideCount + 0.7 : 2.5,
          },
          440: {
            slidesPerView: slideCount ? slideCount + 0.7 : 2.6,
          },
          480: {
            slidesPerView: slideCount ? slideCount + 1.1 : 2.8,
          },
          570: {
            slidesPerView: slideCount ? slideCount + 1.5 : 3,
          },
          620: {
            slidesPerView: slideCount ? slideCount + 1.8 : 3.5,
          },
          700: {
            slidesPerView: slideCount ? slideCount + 2.1 : 4,
          },
          768: {
            slidesPerView: slideCount ? slideCount + 1.4 : 3.2,
          },
          800: {
            slidesPerView: slideCount ? slideCount + 1.7 : 3.5,
          },
          900: {
            slidesPerView: slideCount ? slideCount + 2.3 : 3.8,
          },
          1024: {
            slidesPerView: slideCount ? slideCount + 2.8 : 5,
          },
          1200: {
            slidesPerView: slideCount ? slideCount + 3.7 : 6,
          },
          1400: {
            slidesPerView: slideCount ? slideCount + 4.6 : 7,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {children}
      </Swiper>
    </>
  );
}
