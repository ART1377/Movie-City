import React, { useState } from "react";
import style from "./CustomSlider.module.css";
import Img from "../Img";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Props = {
  name: string;
  id: number;
  poster: string;
  background: string;
  length: number;
  index:number;
};

const CustomSlider = ({ name, id, poster, background, length,index }: Props) => {
  const [current, setCurrent] = useState<number>(1);

  const prev = +current == 1 ? length : +current - 1;
  const next = +current == length ? 1 : +current + 1;

  const prev2 =
    +current == 1 ? length - 1 : +current == 2 ? length : +current - 2;
  const next2 =
    +current == length ? 2 : +current == length - 1 ? 1 : +current + 2;

  return (
    <>
      <div
        onClick={() => setCurrent(index)}
        className={`absolute w-fit rounded-2xl cursor-pointer
              ${index == current && "shadow-2xl"} 
              ${
                index == current
                  ? style.current
                  : index == prev
                  ? style.prev
                  : index == next
                  ? style.next
                  : index == next2
                  ? style.next2
                  : index == prev2
                  ? style.prev2
                  : "hidden"
              } `}
      >
        <div className="relative rounded-2xl overflow-hidden w-[100px] h-[140px] xxs:w-[120px] xxs:h-[170px] xs:w-[140px] xs:h-[190px] sm:w-[180px] sm:h-[230px] lg:w-[200px] lg:h-[260px] ">
          <Img
            url={poster}
            alternative={`${name} Poster`}
            size="w342"
            style="w-full h-full"
          />
        </div>
      </div>




      {/* Arrow For Slider Navigation */}
      <div className="absolute bottom-[27%] xxs:bottom-[23%] xs:bottom-[14%] lg:bottom-[8%] flex gap-5">
        <div
          onClick={() => setCurrent(prev)}
          className="text-lg text-main-green cursor-pointer"
        >
          <BsChevronLeft strokeWidth="3" />
        </div>
        <div
          onClick={() => setCurrent(next)}
          className="text-lg text-main-green cursor-pointer"
        >
          <BsChevronRight strokeWidth="3" />
        </div>
      </div>
    </>
  );
};

export default CustomSlider;
