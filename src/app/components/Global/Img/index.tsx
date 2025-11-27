/* eslint-disable @next/next/no-img-element */
import React from "react";
import { EMPTY_MOVIE_URL, IMAGE_URL, getImageUrl } from "@/app/config";
import Image from "next/image";

type Props = {
  url: string;
  alternative: string;
  isFill?: boolean;
  isPriority?: boolean;
  style?: string;
  size?: string;
};

const Img = ({ url, alternative, isFill, isPriority, style, size }: Props) => {
  return (
    <>
      {/* <Image
        src={url ? `${IMAGE_URL}${url}` : `${EMPTY_MOVIE_URL}`}
        alt={`${alternative} ?  ${alternative} } : "image"`}
        fill={isFill ? true : false}
        priority={isPriority ? true : false}
        className={`w-full h-full ${style ? style : ""}`}
      /> */}
      <img
        src={url ? `${getImageUrl(size)}${url}` : `${EMPTY_MOVIE_URL}`}
        alt={`${alternative} ?  ${alternative} } : "image"`}
        className={`w-full h-full ${style ? style : ""}`}
      />
    </>
  );
};

export default Img;
