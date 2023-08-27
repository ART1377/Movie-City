"use client";
import React from "react";
import style from "./PersonCard.module.css";
import { Knownfor, People } from "../../../../../next-type-d";
import Link from "next/link";
import Img from "../Img";
import Button from "../Button";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import {
  addToFavoritePeople,
  removeFromFavoritePeople,
} from "../../../redux/slices/favorite";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hook";

type Props = {
  person: People;
  imageSize: string;
};
const PersonCard = ({ person, imageSize }: Props) => {
  const list = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  //check is in list or not
  const isInList = list.favoritePeople.find((item) => item == person.id);

  return (
    <>
      <div
        className={`relative shadow-lg bg-white p-2 sm:p-3 flex flex-col items-center ${style.container}`}
      >
        <Link href={"/home"}>
          <div className={`relative ${style.image}`}>
            <Img
              url={person?.profile_path}
              alternative={`${person?.name} image`}
              size={imageSize}
            />
          </div>
          <div
            className={`pb-1 pt-2 text-center flex flex-col justify-between ${style.info}`}
          >
            <p className="font-semibold text-base">{person.name}</p>
          </div>
        </Link>
        <small className="mb-3">{person.known_for_department}</small>
        <div className="w-5 h-5 cursor-pointer inline-block">
          {isInList ? (
            <BsHeartFill
              onClick={() => dispatch(removeFromFavoritePeople(person.id))}
              className="text-main-green"
            />
          ) : (
            <BsHeart
              onClick={() => dispatch(addToFavoritePeople(person.id))}
              className="text-main-green"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PersonCard;
