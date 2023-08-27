"use client";
import React from "react";
import {
  Cast,
  Createdby,
  Crew,
  Genre,
  Image,
  Productioncountry,
  Series,
  SeriesDetail,
} from "../../../../../next-type-d";
import Img from "../../Global/Img";
import style from "./SeriesDetailPage.module.css";
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
import SeriesCard from "../../Global/SeriesCard";
import CastCard from "../../Global/CastCard";
import PhotoGallery from "../../Global/PhotoGallery";
import CustomSlider from "./CustomSlider";
import Comments from "../../Global/Comments";
import {
  addToFavoriteSeries,
  removeFromFavoriteSeries,
} from "../../../redux/slices/favorite";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hook";
import ModalComponent from "../../Global/ModalComponent";
import Share from "../../Global/Share";

type Props = {
  series: SeriesDetail;
  images: Image;
};

const SeriesDetailPage = ({ series, images }: Props) => {
  const list = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  //check is in list or not
  const isInList = list.favoriteSeries?.find((item) => item == series?.id);


  return (
    <>
      <div className={`${style.container}`}>
        {/* Background ************* */}
        {series?.backdrop_path && (
          <div className={` ${style.background}`}>
            <Img
              url={series?.backdrop_path}
              alternative={`${series?.name} image`}
            />
          </div>
        )}

        {/* Poster ************* */}
        <div
          className={`h-[360px] w-full xxs:h-[420px] xs:h-[500px] s:h-[580px] sm:h-[700px] mx-auto mb-4  ${style.imageContainer}`}
        >
          <div
            className={`relative w-full h-[90%] sm:rounded-2xl overflow-hidden ${style.image}`}
          >
            <Img
              url={series?.poster_path}
              alternative={`${series?.name} image`}
            />
            <h6
              className={`text-text-light absolute z-30 bottom-10 left-2 xs:left-4 xs:bottom-14 xs:text-2xl lg:text-3xl ${style.title}`}
            >
              {series?.name}
            </h6>
            {/* Detail ************* */}
            <div
              className={`flex flex-col items-start pt-2 gap-2 absolute bottom-2 left-2 xs:left-4 xs:bottom-4 z-30 ${style.detail}`}
            >
              <div className="text-text-light md:text-text-dark flex items-center gap-1.5">
                <small>
                  {series?.first_air_date?.split("-")[0]} -{" "}
                  {series?.last_air_date?.split("-")[0]}{" "}
                </small>
                <hr className={style.smallLine} />
                <small>{series?.number_of_seasons} season </small>
                <hr className={style.smallLine} />
                <small className="flex items-center font-semibold">
                  <BsStarFill className="text-main-green" />
                  {series?.vote_average.toFixed(1)}
                  <p className="opacity-80 font-normal"> /10</p>
                </small>
                <hr className={style.smallLine} />
                <small className={style.status}>{series?.status}</small>
              </div>
              <div className="!hidden md:!flex gap-1 items-center">
                {series?.production_countries.map(
                  (country: Productioncountry, index: number) => {
                    if (index < 3) {
                      return (
                        <small
                          key={country.iso_3166_1}
                          className="!text-sm flex"
                        >
                          {country.name}
                          {index < 2 &&
                            index !=
                              +series.production_countries.length - 1 && (
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
              <div
                onClick={() => dispatch(removeFromFavoriteSeries(series?.id))}
                className={`flex flex-col gap-1 items-center ${style.option}`}
              >
                <div className="p-2 relative">
                  <BsFillBookmarkFill className="text-main-green text-lg s:text-xl" />
                  <BsCheck className="absolute bottom-[27%] left-[27%] text-white text-base" />
                </div>
                <small className="text-sm text-main-green">Bookmark</small>
              </div>
            ) : (
              <div
                onClick={() => dispatch(addToFavoriteSeries(series?.id))}
                className={`flex flex-col gap-1 items-center ${style.option}`}
              >
                <div className="p-2">
                  <BsBookmark className="text-lg s:text-xl" />
                </div>
                <small className="text-sm">Bookmark</small>
              </div>
            )}

            <ModalComponent
              title={"Shere via Link"}
              toggle={
                <div
                  className={`flex flex-col gap-1 items-center ${style.option}`}
                >
                  <div className="p-2 ">
                    <BsShareFill className="text-lg s:text-xl" />
                  </div>
                  <small className="text-sm">Share</small>
                </div>
              }
            >
              <Share />
            </ModalComponent>
            <Link
              href={series?.homepage}
              className={`flex flex-col gap-1 items-center ${style.option}`}
            >
              <div className="p-2">
                <BsDownload className="text-lg s:text-xl" />
              </div>
              <small className="text-sm">Download</small>
            </Link>
          </div>
        </div>

        {/* info ************* */}
        <div className={`w-full py-2 px-1 ${style.info}`}>
          {/* Storyline ************* */}
          {series.overview && (
            <section className="mt-8">
              <Title>Storyline</Title>
              <p className="text-text-dark text-sm md:max-w-[90%]">
                {series?.overview}
              </p>
            </section>
          )}

          {/* keywords *********** */}
          {series.keywords?.results.length! > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {series?.keywords?.results.map(
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
          {series.genres.length! > 0 && (
            <section className="mt-6">
              <Title>Genres</Title>
              {series?.genres.map((genre: Genre, index: number) => {
                return (
                  <Link key={genre.id} href={`/genres/${genre.id}`}>
                    <small className="inline-flex flex-wrap items-center gap-1 me-1.5">
                      {genre.name}
                      {index != series?.genres.length - 1 && (
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

          {/* Creators ************* */}
          {series.created_by.length! > 0 && (
            <section className="mt-6">
              <Title>Creators</Title>
              <div className="flex gap-5">
                {series?.created_by.map((creator: Createdby) => {
                  return (
                    <Link key={creator.id} href={`/people/${creator.id}`}>
                      <div className="mt-3 w-fit flex flex-col items-center">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Img
                            url={creator.profile_path}
                            alternative={`${creator.name} image`}
                            size="w185"
                          />
                        </div>
                        <p className="text-text-dark">{creator.name}</p>
                        <small className="text-text-dark opacity-80">
                          Director
                        </small>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Casts ************* */}
          {series.credits?.cast.length! > 0 && (
            <section className="mt-6">
              <Title>Cast</Title>
              <Slider slideCount={1.2}>
                {series?.credits?.cast.map((item: Cast) => {
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
          {series.credits?.crew.length! > 0 && (
            <section className="mt-6">
              <Title>Cast</Title>
              <Slider slideCount={1.2}>
                {series?.credits?.crew.map((item: Crew) => {
                  return (
                    <SwiperSlide key={item.credit_id}>
                      <CastCard crew={item} />
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </section>
          )}

          {/* Seasons ************* */}
          {series.seasons.length! > 0 && (
            <section className="mt-10">
              <Title withLine>Season</Title>
              <div className="h-4 w-full"></div>
              <CustomSlider data={series?.seasons} id={series?.id} />
            </section>
          )}

          {/* Similar ************* */}
          {series.similar?.results.length! > 0 && (
            <section className="mt-14">
              <Title>More Like This</Title>
              <Slider>
                {series?.similar?.results.map((item: Series) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <SeriesCard series={item} imageSize="w185" />
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </section>
          )}

          {/* Recommendations ************* */}
          {series.recommendations?.results.length! > 0 && (
            <section className="mt-10">
              <Title>Recommendations</Title>
              <Slider>
                {series?.recommendations?.results?.map((item: Series) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <SeriesCard series={item} imageSize="w185" />
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </section>
          )}

          {/* Comments ************* */}
          <section className="mt-10 mb-40">
            <Title>Comments</Title>
            <Comments authors={series?.reviews?.results!} />
          </section>
        </div>
      </div>
    </>
  );
};

export default SeriesDetailPage;
