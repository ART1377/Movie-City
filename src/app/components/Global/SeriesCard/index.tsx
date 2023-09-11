"use client";
import React from "react";
import style from "./SeriesCard.module.css";
import Link from "next/link";
import Img from "../Img";
import { BsFillBookmarkFill, BsCheck, BsPlus } from "react-icons/bs";
import { Genre, Series } from "../../../../../next-type-d";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hook";
import {
  addToFavoriteSeries,
  removeFromFavoriteSeries,
} from "../../../redux/slices/favorite";
import getGenreNameByGenreId from "@/app/lib/DataFetching/getGenreNameByGenreId";
import CircularProgress from "../CircularProgress";

type Props = {
  series: Series;
  imageSize: string;
};

const SeriesCard = ({ series, imageSize }: Props) => {
  const list = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  //check is in list or not
  const isInList = list.favoriteSeries.find((item) => item == series.id);

  return (
    <>
      <div
        className={`relative shadow-xl hover:!shadow bg-bg-white p-2 sm:p-3 ${style.container}`}
      >
        <Link href={`/series/${series.id}`}>
          <div className={`relative ${style.image}`}>
            <Img
              url={series?.poster_path}
              alternative={`${series.name} image`}
              size={imageSize}
            />
          </div>
        </Link>
        <div
          className={`absolute top-3 left-[7px] cursor-pointer ${style.watch}`}
        >
          {isInList ? (
            <>
              <div
                onClick={() => dispatch(removeFromFavoriteSeries(series.id))}
              >
                <BsFillBookmarkFill className="text-main-green text-4xl"></BsFillBookmarkFill>
                <BsCheck className="absolute bottom-[15%] left-[10%] text-white text-3xl" />
              </div>
            </>
          ) : (
            <>
              <div onClick={() => dispatch(addToFavoriteSeries(series.id))}>
                <BsFillBookmarkFill className="text-black/75 text-4xl"></BsFillBookmarkFill>
                <BsPlus className="absolute bottom-[10%] left-[10%] text-white text-3xl" />
              </div>
            </>
          )}
        </div>
        <div className={`relative pb-1 pt-2 ${style.info}`}>
          <Link href={`/series/${series.id}`}>
            <p className="font-semibold text-sm line-clamp-2">{series.name}</p>
          </Link>
          <div className="line-clamp-1">
            {series?.genre_ids?.map((genreId: number, index: number) => {
              if (index < 2) {
                return (
                  <Link href={`/genres/${genreId}?page=1`} key={genreId}>
                    <small>
                      {getGenreNameByGenreId(genreId)}
                      {+series.genre_ids.length > 1 && index < 1 && <hr />}
                    </small>
                  </Link>
                );
              }
            })}
          </div>
        </div>
        <div className={`${style.rate}`}>
          <CircularProgress percentage={+series?.vote_average.toFixed(1)} />
        </div>
      </div>
    </>
  );
};

export default SeriesCard;

//https://image.tmdb.org/t/p/w500/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg?api_key=1cbec913c5df4abcc1aad8dd5a3d46a6
