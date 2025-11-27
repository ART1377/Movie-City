import React from "react";
import style from "./FavoriteCard.module.css";
import Img from "../../Global/Img";
import {
  BsCalendarRange,
  BsFillXDiamondFill,
  BsGlobeAmericas,
  BsPeople,
  BsStarFill,
  BsTrash3,
  BsHeart,
  BsHeartFill,
  BsCameraReels,
} from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import {
  addToFavoriteMovies,
  removeFromFavoriteMovies,
  addToFavoritePeople,
  removeFromFavoritePeople,
  addToFavoriteSeries,
  removeFromFavoriteSeries,
} from "../../../redux/slices/favorite";
import Link from "next/link";

type Props = {
  data: any;
  count: number;
  searchItem?: boolean;
};

const FavoriteCard = ({ data, count, searchItem }: Props) => {
  const dispatch = useAppDispatch();

  const typeCard = data?.gender ? "people" : data?.title ? "movie" : "series";

  const imageCard = data?.poster_path ? data?.poster_path : data?.profile_path;

  const nameCard = data?.name ? data?.name : data?.title;

  const dateCard =
    typeCard == "series"
      ? `${data?.first_air_date?.split("-")?.[0]}  ${
         - data?.last_air_date?.split("-")?.[0]?data?.last_air_date?.split("-")?.[0]:''
        }`
      : typeCard == "movie"
      ? data?.release_date?.split("-")?.[0]
      : `${data?.birthday?.split("-")?.[0]} 
      ${
        - data?.deathday?.split("-")?.[0]?data?.deathday?.split("-")?.[0]:''
       }`;

  //check is in list or not
  const favoriteLists = useAppSelector((state) => state.favorite);
  const list =
    typeCard == "movie"
      ? favoriteLists.favoriteMovies
      : typeCard == "series"
      ? favoriteLists.favoriteSeries
      : favoriteLists.favoritePeople;
  const isInList = searchItem && list.find((item) => item == data?.id);

  const removeHandler = () => {
    if (searchItem && !isInList) {
      if (typeCard == "movie") {
        dispatch(addToFavoriteMovies(data?.id));
      } else if (typeCard == "series") {
        dispatch(addToFavoriteSeries(data?.id));
      } else {
        dispatch(addToFavoritePeople(data?.id));
      }
    } else {
      if (typeCard == "movie") {
        dispatch(removeFromFavoriteMovies(data?.id));
      } else if (typeCard == "series") {
        dispatch(removeFromFavoriteSeries(data?.id));
      } else {
        dispatch(removeFromFavoritePeople(data?.id));
      }
    }
  };

  return (
    <div
      className={`${
        style.container
      } relative bg-bg-white rounded-2xl flex mx-auto shadow-lg hover:shadow mb-6 cursor-pointer ${
        count == 1 && "!w-[95%] !max-w-[600px]"
      }`}
    >
      <Link href={`/${typeCard}/${data?.id}`}
        className={`relative w-[40%] max-w-[140px] overflow-hidden bg-bg-body pr-2 pb-2 rounded-ss-sm rounded-se-sm rounded-ee-[40px] rounded-es-sm`}
      >
        <Img
          url={imageCard}
          alternative={`${nameCard}image`}
          size="w185"
          style=" rounded-ss-sm rounded-se-sm rounded-ee-[40px] rounded-es-sm"
        />
      </Link>
      <Link href={`/${typeCard}/${data?.id}`} className="p-2 flex flex-col gap-1 xxs:gap-1.5 lg:gap-2 w-[75%]">
        <p
          className={`line-clamp-2 mb-1 sm:mb-1.5 text-text-dark ${
            searchItem && "!mb-3"
          }`}
        >
          {nameCard}
        </p>
        {searchItem && typeCard == "people" ? (
          <small className="sm:text-sm flex items-baseline text-text-dark gap-0.5">
            <small className="flex items-baseline mr-0.5 text-main-green sm:text-sm">
              <BsCameraReels className="text-main-green mr-0.5 pt-0.5" />{" "}
              Department
            </small>
            {data?.known_for_department}
          </small>
        ) : (
          <small className="sm:text-sm flex items-baseline text-text-dark gap-0.5">
            <small className="flex items-baseline mr-0.5 text-main-green sm:text-sm">
              <BsCalendarRange className="text-main-green mr-0.5 pt-0.5" />{" "}
              {typeCard == "series"
                ? "Date :"
                : typeCard == "movie"
                ? "Release Date :"
                : "Born"}
            </small>
            {dateCard}
          </small>
        )}
        {!searchItem && (
          <small className="sm:text-sm flex items-baseline text-text-dark gap-0.5">
            <small className="flex items-baseline mr-0.5 text-main-green sm:text-sm">
              {typeCard == "people" ? (
                <BsGlobeAmericas className="text-main-green mr-0.5 pt-0.5" />
              ) : (
                <BsFillXDiamondFill className="text-main-green mr-0.5 pt-0.5" />
              )}
              {typeCard == "series"
                ? "Season Number :"
                : typeCard == "movie"
                ? "Runtime :"
                : "Country"}
            </small>
            {typeCard == "series"
              ? data?.number_of_seasons
              : typeCard == "movie"
              ? data?.runtime
              : data?.place_of_birth?.split(",")?.splice(-1)}
          </small>
        )}
        <small className="flex items-baseline font-semibold text-text-dark gap-0.5">
          <small className="flex items-baseline mr-0.5 text-main-green sm:text-sm">
            {typeCard == "people" ? (
              <BsPeople className="text-main-green mr-0.5 pt-0.5" />
            ) : (
              <BsStarFill className="text-main-green mr-0.5 pt-0.5" />
            )}
            {typeCard == "series"
              ? " Rate :"
              : typeCard == "movie"
              ? " Rate :"
              : " Popularity :"}
          </small>
          <small className="sm:text-sm font-normal">
            {typeCard == "people"
              ? data?.popularity.toFixed(1)
              : data?.vote_average.toFixed(1)}
          </small>
        </small>
      </Link>
      <div className="w-12 h-12 rounded-xl bg-bg-body transform rotate-45 flex justify-center items-center absolute z-[2] right-6 -bottom-6">
        <div
          onClick={removeHandler}
          className={`${style.trash} bg-main-green w-[75%] h-[75%] rounded-xl flex justify-center items-center cursor-pointer`}
        >
          {searchItem ? (
            isInList ? (
              <BsHeartFill className="text-white transform -rotate-45" />
            ) : (
              <BsHeart className="text-white transform -rotate-45" />
            )
          ) : (
            <BsTrash3 className="text-white transform -rotate-45" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
