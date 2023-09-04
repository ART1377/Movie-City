"use client";
import React from "react";
import style from "./PersonCard.module.css";
import { Knownfor, People } from "../../../../../next-type-d";
import Link from "next/link";
import Img from "../Img";
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
      <div className={`relative shadow-lg ${style.container}`}>
        <Link href={`/people/${person.id}`} className={`relative shadow-lg ${style.image}`}>
          <Img
            url={person?.profile_path}
            alternative={`${person?.name} image`}
            size={imageSize}
          />
          <div className="absolute bottom-0 z-20 w-full text-white flex p-2">
            <div className={`flex justify-between ${style.info}`}>
              <p className="text-sm">{person.name}</p>
            </div>
          </div>
        </Link>
        <div className="w-5 h-5 cursor-pointer inline-block absolute right-1.5 bottom-1.5 z-30">
          {isInList ? (
            <BsHeartFill
              strokeWidth="1"
              onClick={() => dispatch(removeFromFavoritePeople(person.id))}
              className="text-main-green"
            />
          ) : (
            <BsHeart
              strokeWidth="1"
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
