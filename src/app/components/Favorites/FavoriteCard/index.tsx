import React from "react";
import Img from "../../Global/Img";
import {
  BsCalendarRange,
  BsFillXDiamondFill,
  BsGlobeAmericas,
  BsPeople,
  BsStarFill,
  BsTextParagraph,
  BsTrash3,
} from "react-icons/bs";
import { useAppDispatch } from "@/app/redux/hooks/hook";
import {
  addToFavoriteMovies,
  removeFromFavoriteMovies,
  addToFavoritePeople,
  removeFromFavoritePeople,
  addToFavoriteSeries,
  removeFromFavoriteSeries,
} from "../../../redux/slices/favorite";

type Props = {
  data: any;
};

const FavoriteCard = ({ data }: Props) => {
  const dispatch = useAppDispatch();

  const typeCard = data?.gender ? "people" : data?.title ? "movie" : "series";

  const imageCard = data?.poster_path ? data?.poster_path : data?.profile_path;

  const nameCard = data?.name ? data?.name : data?.title;

  const dateCard =
    typeCard == "series"
      ? `${data?.first_air_date?.split("-")[0]} - ${
          data?.last_air_date?.split("-")[0]
        }`
      : typeCard == "movie"
      ? data.release_date
      : `${data?.birthday?.split("-")[0]} - ${
          data?.deathday?.split("-")?.[0] && data?.deathday?.split("-")?.[0]
        }`;

  const removeHandler = () => {
    if (typeCard == "movie") {
      dispatch(removeFromFavoriteMovies(data.id));
    } else if (typeCard == "series") {
      dispatch(removeFromFavoriteSeries(data.id));
    } else {
      dispatch(removeFromFavoritePeople(data.id));
    }
  };

  return (
    <div className="relative bg-white w-[260px] min-h-[140px] xxs:w-[300px] xxs:min-h-[160px] lg:w-[400px] lg:min-h-[220px] rounded-2xl flex shadow-md mb-6">
      <div
        className={`relative w-[38%] overflow-hidden bg-bg-body pr-2 pb-2 rounded-ss-sm rounded-se-sm rounded-ee-[40px] rounded-es-sm`}
      >
        <Img
          url={imageCard}
          alternative={`${nameCard}image`}
          size="w185"
          style=" rounded-ss-sm rounded-se-sm rounded-ee-[40px] rounded-es-sm"
        />
      </div>
      <div className="p-2 flex flex-col gap-1 xxs:gap-1.5 w-[75%]">
        <p className="line-clamp-2 mb-1 xxs:mb-1.5">{nameCard}</p>
        <small className="xxs:text-sm flex items-baseline">
          <small className="flex items-baseline mr-0.5 text-main-green xxs:text-sm">
            <BsCalendarRange className="text-main-green mr-0.5 mt-0.5" />{" "}
            {typeCard == "series"
              ? "Date :"
              : typeCard == "movie"
              ? "Release Date :"
              : "Born"}
          </small>
          {dateCard}
        </small>
        <small className="xxs:text-sm flex items-baseline">
          <small className="flex items-baseline mr-0.5 text-main-green xxs:text-sm">
            {typeCard == "people" ? (
              <BsGlobeAmericas className="text-main-green mr-0.5 mt-0.5" />
            ) : (
              <BsFillXDiamondFill className="text-main-green mr-0.5 mt-0.5" />
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
            : data?.place_of_birth.split(",").splice(-1)}
        </small>
        <small className="flex items-baseline font-semibold">
          <small className="flex items-baseline mr-0.5 text-main-green xxs:text-sm">
            {typeCard == "people" ? (
              <BsPeople className="text-main-green mr-0.5 mt-0.5" />
            ) : (
              <BsStarFill className="text-main-green mr-0.5 mt-0.5" />
            )}
            {typeCard == "series"
              ? " Rate :"
              : typeCard == "movie"
              ? " Rate :"
              : " Popularity :"}
          </small>
          <small className="xxs:text-sm font-normal">
            {typeCard == "people"
              ? data?.popularity
              : data?.vote_average.toFixed(1)}
          </small>
        </small>





{/* 
        <small className="hidden lg:flex items-baseline font-semibold !line-clamp-2">
          <small className="flex items-baseline mr-0.5 text-main-green xxs:text-sm">
              <BsTextParagraph className="text-main-green mr-0.5 mt-0.5" />
              {typeCard == "people"
              ? " Biography "
              :  " Storyline  "} :
          </small>
            {typeCard == "people"
              ? data?.biography
              : data?.overview}
        </small> */}
        
      </div>
      <div className="w-12 h-12 rounded-xl bg-bg-body transform rotate-45 flex justify-center items-center absolute z-[2] right-6 -bottom-6">
        <div
          onClick={removeHandler}
          className="bg-main-green w-[75%] h-[75%] rounded-xl flex justify-center items-center cursor-pointer"
        >
          <BsTrash3 className="text-white transform -rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
