"use client";
import React from "react";
import {
  Cast,
  Genre,
  Image,
  Productioncountry,
  Movie,
  MovieDetail,
  Crew,
  Productioncompany,
} from "../../../../../next-type-d";
import Img from "../../Global/Img";
import style from "./MovieDetailPage.module.css";
import {
  BsShareFill,
  BsDownload,
  BsBookmark,
  BsStarFill,
  BsFillBookmarkFill,
  BsCheck,
} from "react-icons/bs";
import Title from "../../Global/Title";
import Link from "next/link";
import Slider from "../../Global/Slider";
import { SwiperSlide } from "swiper/react";
import CastCard from "../../Global/CastCard";
import PhotoGallery from "../../Global/PhotoGallery";
import Comments from "../../Global/Comments";
import {
  addToFavoriteMovies,
  removeFromFavoriteMovies,
} from "../../../redux/slices/favorite";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hook";
import ModalComponent from "../../Global/ModalComponent";
import Share from "../../Global/Share";
import MovieCard from "../../Global/MovieCard";
import { motion } from "framer-motion";
import { scaleOpacity } from "@/app/animations/animation";

type Props = {
  movie: MovieDetail;
  images: Image;
};

const MovieDetailPage = ({ movie, images }: Props) => {
  const list = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  //check is in list or not
  const isInList = list.favoriteMovies.find((item) => item == movie?.id);

  return (
    <>
      <div className={` ${style.container}`}>
        {/* Background ************* */}

        {movie?.backdrop_path && (
          <div className={` ${style.background}`}>
            <Img
              url={movie?.backdrop_path}
              alternative={`${movie?.title} image`}
            />
                 <div
              className={`absolute bottom-0 right-0 z-30 !hidden md:!block !pl-4 xm:!pl-5 lg:!pl-6 xl:!pl-8 pt-2 ${style.statusContainer}`}
            >
              <p
                className={`text-white !px-6 xm:!px-8 lg:!px-10 xl:!px-14 2xl:!px-16 !py-0.5  ${style.status}`}
              >
                {movie?.status}
              </p>
            </div>
          </div>
        )}

        {/* <div className="absolute h-16 w-28">
            <Img
              url={movie?.production_companies[0].logo_path!}
              alternative=""
              size="w154"
            />
          </div> */}

        {/* Poster ************* */}
        <div
          className={`h-[400px] w-full xxs:h-[500px] xs:h-[540px] mx-auto mb-4 max-w-[400px]  ${style.imageContainer}`}
        >
          <div className={`relative w-full h-[90%] ${style.image}`}>
            <Img
              url={movie?.poster_path}
              alternative={`${movie?.title} image`}
            />
               <p className={`text-white absolute top-full right-0 z-30 !px-4 md:!hidden ${style.status}`}>{movie?.status}</p>
            <h6
              className={`text-header-color absolute z-30 bottom-10 left-2 xs:left-4 xs:bottom-14 xs:text-2xl line-clamp-2 ${style.title}`}
            >
              {movie?.title}
            </h6>
            {/* Detail ************* */}
            <div
              className={`flex flex-col items-start pt-2 gap-2 absolute bottom-2 left-2 xs:left-4 xs:bottom-4 z-30 ${style.detail}`}
            >
              <div className="text-header-color md:text-text-dark flex items-center gap-1.5">
                <small>{movie?.release_date?.split("-")[0]}</small>
                <hr className={style.smallLine} />
                <small>{movie?.runtime} m</small>
                <hr className={style.smallLine} />
                <small className="flex items-center font-semibold">
                <BsStarFill className="text-main-green text-sm me-0.5" />
                  <small className="!text-base text-main-green">
                  {movie?.vote_average.toFixed(1)}
                  </small>
                  <p className="opacity-80 font-normal"> /10</p>
                </small>
                {/* <hr className={style.smallLine} />
                <small className={style.status}>{movie?.status}</small> */}
              </div>
              <div className="!hidden md:!flex gap-1 items-center">
                {movie?.production_countries.map(
                  (country: Productioncountry, index: number) => {
                    if (index < 3) {
                      return (
                        <small
                          key={country.iso_3166_1}
                          className="!text-sm flex"
                        >
                          {country.name}
                          {index < 2 &&
                            index != +movie.production_countries.length - 1 && (
                              <hr
                                className={`my-auto ms-1 ${style.smallLine}`}
                              />
                            )}
                        </small>
                      );
                    }
                  }
                )}
              </div>
            </div>
          </div>

          {/* Options ************* */}
          <div
            className={`flex items-center gap-4 mt-3 mb-6 text-text-dark px-2 ${style.options}`}
          >
            {isInList ? (
              <>
                <div
                  onClick={() => dispatch(removeFromFavoriteMovies(movie?.id))}
                  className={`flex flex-col gap-1 items-center ${style.option}`}
                >
                  <div className="p-2 relative">
                    <BsFillBookmarkFill className="text-main-green text-base xs:text-lg" />
                    <BsCheck className="absolute bottom-[28%] left-[28%] xs:bottom-[29%] xsleft-[29%] text-white text-sm" />
                  </div>
                  <small className="text-xs xs:text-sm text-main-green">
                    Bookmark
                  </small>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => dispatch(addToFavoriteMovies(movie?.id))}
                  className={`flex flex-col gap-1 items-center ${style.option}`}
                >
                  <div className="p-2">
                    <BsBookmark className="text-base xs:text-lg" />
                  </div>
                  <small className="text-xs xs:text-sm">Bookmark</small>
                </div>
              </>
            )}

            <ModalComponent
              title={"Shere via Link"}
              toggle={
                <div
                  className={`flex flex-col gap-1 items-center ${style.option}`}
                >
                  <div className="p-2 ">
                    <BsShareFill className="text-base xs:text-lg" />
                  </div>
                  <small className="text-xs xs:text-sm">Share</small>
                </div>
              }
            >
              <Share />
            </ModalComponent>
            <Link
              href={movie?.homepage}
              className={`flex flex-col gap-1 items-center ${style.option}`}
            >
              <div className="p-2">
                <BsDownload className="text-base xs:text-lg" />
              </div>
              <small className="text-xs xs:text-sm">Download</small>
            </Link>
          </div>
        </div>

        {/* info ************* */}
        <div className={`w-full py-2 px-1 ${style.info}`}>
          {/* Storyline ************* */}
          {movie.overview && (
            <section className="mt-8">
              <Title>Storyline</Title>
              <p className="text-text-dark text-sm md:max-w-[90%]">
                {movie?.overview}
              </p>
            </section>
          )}

          {/* keywords *********** */}
          {movie.keywords?.results?.length! > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {movie?.keywords?.results?.map(
                (keyword: Genre, index: number) => {
                  if (index < 5) {
                    return (
                      <small
                        key={keyword.id}
                        className="bg-text-light text-text-dark shadow py-0.5 px-1.5 rounded-full"
                      >
                        {keyword.name}
                      </small>
                    );
                  }
                }
              )}
            </div>
          )}

          {/* Genres ******** */}
          {movie.genres?.length! > 0 && (
            <section className="mt-6">
              <Title>Genres</Title>
              {movie?.genres.map((genre: Genre, index: number) => {
                return (
                  <Link key={genre.id} href={`/genres/${genre.id}?page=1`}>
                    <small className="inline-flex flex-wrap items-center gap-1 me-1.5">
                      {genre.name}
                      {index != movie?.genres?.length - 1 && (
                        <hr className={style.smallLine} />
                      )}
                    </small>
                  </Link>
                );
              })}
            </section>
          )}

          {/* Gallery ************* */}
          {images && (
            <section className="mt-6">
              <Title>Top Images</Title>
              <PhotoGallery images={images} />
            </section>
          )}

          {/* Casts ************* */}
          {movie.credits?.cast?.length! > 0 && (
            <section className="mt-6">
              <Title>Cast</Title>
              <Slider slideCount={1.2}>
                {movie?.credits?.cast.map((item: Cast) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <CastCard cast={item} />
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </section>
          )}

          {/* Crew ************* */}
          {movie.credits?.crew?.length! > 0 && (
            <motion.section variants={scaleOpacity}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-6">
              <Title>Crew</Title>
              <Slider slideCount={1.2}>
                {movie?.credits?.crew.map((item: Crew) => {
                  return (
                    <SwiperSlide key={item.credit_id}>
                      <CastCard crew={item} />
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </motion.section>
          )}

          {/* Similar ************* */}
          {movie.similar?.results?.length! > 0 && (
            <motion.section variants={scaleOpacity}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-14">
              <Title>More Like This</Title>
              <Slider>
                {movie?.similar?.results.map((item: Movie) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <MovieCard movie={item} imageSize="w185" />
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </motion.section>
          )}

          {/* Recommendations ************* */}
          {movie.recommendations?.results?.length! > 0 && (
            <motion.section variants={scaleOpacity}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-10">
              <Title>Recommendations</Title>
              <Slider>
                {movie?.recommendations?.results?.map((item: Movie) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <MovieCard movie={item} imageSize="w185" />
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </motion.section>
          )}

          {/* Comments ************* */}
          <motion.section variants={scaleOpacity}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-10 mb-40">
            <Title>Comments</Title>
            <Comments authors={movie?.reviews?.results!} />
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default MovieDetailPage;
