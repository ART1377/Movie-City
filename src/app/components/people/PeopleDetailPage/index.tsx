"use client";
import React from "react";
import {
  Movie,
  PeopleDetail,
  PeopleCombinedCredits,
  Series,
} from "../../../../../next-type-d";
import Img from "../../Global/Img";
import style from "./PeopleDetailPage.module.css";
import {
  BsShareFill,
  BsBookmark,
  BsFillBookmarkFill,
  BsCheck,
  BsPeople,
  BsInfoCircle,
} from "react-icons/bs";
import Title from "../../Global/Title";
import Link from "next/link";
import Slider from "../../Global/Slider";
import { SwiperSlide } from "swiper/react";
import PhotoGallery from "../../Global/PhotoGallery";
import {
  addToFavoritePeople,
  removeFromFavoritePeople,
} from "../../../redux/slices/favorite";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hook";
import ModalComponent from "../../Global/ModalComponent";
import Share from "../../Global/Share";
import MovieCard from "../../Global/MovieCard";
import SeriesCard from "../../Global/SeriesCard";

type Props = {
  people: PeopleDetail;
  credits: PeopleCombinedCredits;
};

const PeopleDetailPage = ({ people, credits }: Props) => {
  const list = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  //Check is in list or not
  const isInList = list.favoritePeople.find((item) => item == people?.id);

  // Read More ...
  const clickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLInputElement;
    target.classList.toggle("line-clamp-6");
  };

  
  return (
    <>
      <div className={`${style.container}`}>
           {/* Background ************* */}

           {/* {people?.profile_path && (
          <div className={` ${style.background}`}>
            <Img
              url={people?.profile_path}
              alternative={`${people?.name} image`}
            />
          </div> 
        )}*/}
        {/* Poster ************* */}
        <div
          className={`h-[400px] w-full xxs:h-[500px] xs:h-[540px] mx-auto mb-4 max-w-[400px]  ${style.imageContainer}`}
        >
          <div
            className={`relative w-full h-[90%] ${style.image}`}
          >
            <Img
              url={people?.profile_path}
              alternative={`${people?.name} image`}
            />
            <h6
              className={`text-text-light absolute z-30 bottom-10 left-2 xs:left-4 xs:bottom-14 xs:text-2xl lg:text-3xl ${style.title}`}
            >
              {people?.name}
            </h6>
            {/* Detail ************* */}
            <div
              className={`flex flex-col items-start pt-2 gap-2 absolute bottom-2 left-2 xs:left-4 xs:bottom-4 z-30 ${style.detail}`}
            >
              <div className="text-text-light flex items-center gap-1.5">
                <small>{people?.birthday?.split("-")[0]} - </small>
                <small>{people?.deathday?.split("-")[0]}</small>
                <hr className={style.smallLine} />
                <small className="flex items-center font-semibold">
                  <BsPeople className="text-main-green" />
                  &nbsp; &nbsp;
                  {people?.popularity.toFixed(1)}
                </small>
                <hr className={style.smallLine} />
                <small>{people?.place_of_birth}</small>
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
                  onClick={() => dispatch(removeFromFavoritePeople(people?.id))}
                  className={`flex flex-col gap-1 items-center ${style.option}`}
                >
                  <div className="p-2 relative">
                  <BsFillBookmarkFill className="text-main-green text-base xs:text-lg" />
                  <BsCheck className="absolute bottom-[28%] left-[28%] xs:bottom-[29%] xsleft-[29%] text-white text-sm" />
                </div>
                <small className="text-xs xs:text-sm text-main-green">Bookmark</small>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => dispatch(addToFavoritePeople(people?.id))}
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
              href={people?.homepage ?? "/"}
              className={`flex flex-col gap-1 items-center ms-1 ${style.option}`}
            >
              <div className="p-2">
                <BsInfoCircle className="text-base xs:text-lg" />
              </div>
              <small className="text-xs xs:text-sm">More</small>
            </Link>
          </div>
        </div>

        {/* info ************* */}
        <div className={`w-full py-2 px-1 ${style.info}`}>
          {/* Biography ************* */}
          {people.biography && (
            <section className={`mt-8 ${style.biography}`}>
              

              <Title>Biography</Title>
              <p
                onClick={clickHandler}
                className="line-clamp-6 text-text-dark text-sm md:max-w-[90%] cursor-pointer"
              >
                {people?.biography}
              </p>
            </section>
          )}

          {/* Gallery ************* */}
          {people.images.profiles.length>0 && (
            <section className={`mt-6 sm:mt-16 xm:mt-0 ${style.gallery}`}>
              <Title>Top Images</Title>
              <PhotoGallery peopleImages={people.images} />
            </section>
          )}

          {/* Cast's Movies ************* */}
          {credits.cast.find(item=>item.media_type=='movie') && (
            <section className="mt-14">
              <Title>{`${people.name}'s Movies`}</Title>
              <Slider>
                {credits.cast.map((item) => {
                  if (item.media_type == "movie") {
                    return (
                      <SwiperSlide key={item.id}>
                        <MovieCard movie={item as Movie} imageSize="w185" />
                      </SwiperSlide>
                    );
                  }
                })}
              </Slider>
            </section>
          )}
          {/* Cast's Series ************* */}
          {credits.cast.find(item=>item.media_type=='tv') && (
            <section className="mt-14">
              <Title>{`${people.name}'s Series`}</Title>
              <Slider>
                {credits.cast.map((item) => {
                  if (item.media_type == "tv") {
                    return (
                      <SwiperSlide key={`${item.id}${item.character}`}>
                        <SeriesCard series={item as Series} imageSize="w185" />
                      </SwiperSlide>
                    );
                  }
                })}
              </Slider>
            </section>
          )}
          {/* Crew's Movies ************* */}
          {credits.crew.find(item=>item.media_type=='movie') && (
            <section className="mt-14">
              <Title>{`${people.name}'s Movies as Crew`}</Title>
              <Slider>
                {credits.crew.map((item) => {
                  if (item.media_type == "movie") {
                    return (
                      <SwiperSlide key={item.id}>
                        <MovieCard movie={item as Movie} imageSize="w185" />
                      </SwiperSlide>
                    );
                  }
                })}
              </Slider>
            </section>
          )}
          {/* Crew's Series ************* */}
          {credits.crew.find(item=>item.media_type=='tv') && (
            <section className="mt-14">
              <Title>{`${people.name}'s Series as Crew`}</Title>
              <Slider>
                {credits.crew.map((item) => {
                  if (item.media_type == "tv") {
                    return (
                      <SwiperSlide key={item.id}>
                        <SeriesCard series={item as Series} imageSize="w185" />
                      </SwiperSlide>
                    );
                  }
                })}
              </Slider>
            </section>
          )}
          <div className="mb-40"></div>
        </div>
      </div>
    </>
  );
};

export default PeopleDetailPage;
