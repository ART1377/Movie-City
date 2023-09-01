"use client";
import React, { useState } from "react";
import style from "./Episode.module.css";
import { Episode, SeasonDetail } from "../../../../../../next-type-d";
import { BsChevronDown, BsFillStarFill } from "react-icons/bs";
import Button from "@/app/components/Global/Button";

type Props = {
  data: SeasonDetail;
};

const Episode = ({ data }: Props) => {
  const [show, setShow] = useState<number>();
  const [count, setCount] = useState<number>(30);

  const loadMore = () => {
    if (+data?.episodes?.length < +count && +count > 30) {
      setCount(30);
    } else {
      setCount((prev) => +prev + 30);
    }
  };

  // if (!data) {
  //   return <p>loading ...</p>;
  // }

  return (
    <>
      <div className="flex flex-wrap justify-around gap-4  xs:px-4">
        {data && data?.episodes?.length <= 0 && <p>returning in future</p>}
        {data?.episodes?.map((episode: Episode, index: number) => {
          if (index < count) {
            return (
              <div
                key={episode?.id}
                className={`w-full !h-fit relative max-w-[500px] flex flex-col p-3 rounded-2xl text-text-dark ${
                  style.episode
                } ${episode?.id == show ? style.show : style.hide}`}
              >
                <div
                  onClick={() =>
                    setShow(episode?.id == show ? -1 : episode?.id)
                  }
                  className="flex items-center w-[90%] cursor-pointer"
                >
                  <div className="font-semibold flex items-center gap-0.5">
                    <p>Episode</p>
                    <p>{episode?.episode_number}</p>
                    <p>:</p>
                  </div>
                  <p className="line-clamp-1">&nbsp; {episode?.name}</p>
                  <div
                    className={`absolute w-6 h-6 right-[6%] flex justify-center items-center cursor-pointer ${style.arrow}`}
                  >
                    <BsChevronDown />
                  </div>
                </div>
                <div className={`w-full mt-2 p-2 border-t ${style.overview}`}>
                  <p className="text-sm">{episode?.overview}</p>
                  <div className="mt-4 flex justify-between">
                    <small>{episode?.air_date}</small>

                    <small className="flex gap-0.5 items-center text-sm">
                      <BsFillStarFill className="text-sm" />
                      {episode?.vote_average.toFixed(1)}
                    </small>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <Button
          onClick={loadMore}
          type="button"
          btnType="main"
          css={`
            ${+data?.episodes?.length <= 30 && "!hidden"}
          `}
        >
          {+data?.episodes?.length < +count && +count > 30
            ? "Show Less"
            : "Show More"}
        </Button>
      </div>
    </>
  );
};

export default Episode;
