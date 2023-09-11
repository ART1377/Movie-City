"use client";
import React from "react";
import style from "./MovieCard.module.css";
import Link from "next/link";
import Img from "../Img";
import { BsFillBookmarkFill, BsCheck, BsPlus } from "react-icons/bs";
import { Genre, Movie } from "../../../../../next-type-d";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hook";
import {
  addToFavoriteMovies,
  removeFromFavoriteMovies,
} from "../../../redux/slices/favorite";
import getGenreNameByGenreId from "@/app/lib/DataFetching/getGenreNameByGenreId";
import CircularProgress from "../CircularProgress";

type Props = {
  movie: Movie;
  imageSize: string;
};

const MovieCard = ({ movie, imageSize }: Props) => {
  const list = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  //check is in list or not
  const isInList = list.favoriteMovies.find((item) => item == movie.id);

  return (
    <>
      <div
        className={`relative shadow-xl hover:!shadow bg-bg-white p-2 sm:p-3  ${style.container}`}
      >
        <Link href={`/movie/${movie.id}`}>
          <div className={`relative ${style.image}`}>
            <Img
              url={movie?.poster_path}
              alternative={`${movie.title} image`}
              size={imageSize}
            />
          </div>
        </Link>
        <div
          className={`absolute top-3 left-[7px] cursor-pointer ${style.watch}`}
        >
          {isInList ? (
            <>
              <div onClick={() => dispatch(removeFromFavoriteMovies(movie.id))}>
                <BsFillBookmarkFill className="text-main-green text-4xl"></BsFillBookmarkFill>
                <BsCheck className="absolute bottom-[15%] left-[10%] text-white text-3xl" />
              </div>
            </>
          ) : (
            <>
              <div onClick={() => dispatch(addToFavoriteMovies(movie.id))}>
                <BsFillBookmarkFill className="text-black/75 text-4xl"></BsFillBookmarkFill>
                <BsPlus className="absolute bottom-[10%] left-[10%] text-white text-3xl" />
              </div>
            </>
          )}
        </div>
        <div className={`relative pb-1 pt-2 ${style.info}`}>
          <Link href={`/movie/${movie.id}`}>
            <p className="font-semibold text-sm line-clamp-2">{movie.title}</p>
          </Link>
          <div className="line-clamp-1">
            {movie?.genre_ids?.map((genreId: number, index: number) => {
              if (index < 2) {
                return (
                  <Link href={`/genres/${genreId}?page=1`} key={genreId}>
                    <small>
                      {getGenreNameByGenreId(genreId)}
                      {+movie.genre_ids.length > 1 && index < 1 && <hr />}
                    </small>
                  </Link>
                );
              }
            })}
          </div>
        </div>
        <div className={`${style.rate}`}>
          <CircularProgress percentage={+movie?.vote_average.toFixed(1)} />
        </div>
      </div>
    </>
  );
};

export default MovieCard;

//https://image.tmdb.org/t/p/w500/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg?api_key=1cbec913c5df4abcc1aad8dd5a3d46a6
