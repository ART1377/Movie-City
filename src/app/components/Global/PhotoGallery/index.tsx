/* eslint-disable @next/next/no-img-element */
import React from "react";

import "photoswipe/dist/photoswipe.css";
import { Gallery, GalleryProps, Item } from "react-photoswipe-gallery";
import { DataSourceArray } from "photoswipe";

import style from "./PhotoGallery.module.css";
import { Backdrop, Image, PeopleImages } from "../../../../../next-type-d";

type Props = {
  images?: Image;
  peopleImages?: PeopleImages;
};

const PhotoGallery = ({ images, peopleImages }: Props) => {
  const uiElements: GalleryProps["uiElements"] = [
    {
      name: "bulletsIndicator",
      order: 9,
      isButton: false,
      appendTo: "wrapper",
      onInit: (el, pswpInstance) => {
        let prevIndex = -1;
        const thumbnails: HTMLElement[] = [];

        el.style.position = "absolute";
        el.style.bottom = "20px";
        el.style.left = "10px";
        el.style.right = "0";
        el.style.display = "grid";
        el.style.gridGap = "10px";
        el.style.gridTemplateColumns = "repeat(auto-fit, 40px)";
        el.style.gridTemplateRows = "repeat(auto-fit, 40px)";
        el.style.justifyContent = "center";

        const dataSource = pswpInstance.options.dataSource as DataSourceArray;

        for (let i = 0; i < dataSource.length; i++) {
          const slideData = dataSource[i];

          const thumbnail = document.createElement("div");
          thumbnail.style.transition = "transform 0.15s ease-in";
          thumbnail.style.opacity = "0.6";
          thumbnail.style.cursor = "pointer";
          thumbnail.onclick = (e: MouseEvent) => {
            const target = e.target as HTMLImageElement | HTMLDivElement;
            const thumbnailEl =
              target.tagName === "IMG"
                ? target.parentElement
                : (e.target as HTMLImageElement | HTMLDivElement);
            if (thumbnailEl) {
              pswpInstance.goTo(thumbnails.indexOf(thumbnailEl));
            }
          };

          const thumbnailImage = document.createElement("img");
          thumbnailImage.setAttribute("src", slideData.msrc || "");
          thumbnailImage.style.width = "100%";
          thumbnailImage.style.height = "100%";
          thumbnailImage.style.objectFit = "cover";

          thumbnail.appendChild(thumbnailImage);

          el.appendChild(thumbnail);
          thumbnails.push(thumbnail);
        }

        pswpInstance.on("change", () => {
          if (prevIndex >= 0) {
            const prevThumbnail = thumbnails[prevIndex];
            prevThumbnail.style.opacity = "0.6";
            prevThumbnail.style.cursor = "pointer";
            prevThumbnail.style.transform = "scale(1)";
          }
          const currentThumbnail = thumbnails[pswpInstance.currIndex];
          currentThumbnail.style.opacity = "1";
          currentThumbnail.style.cursor = "unset";
          currentThumbnail.style.transform = "scale(1.2)";
          prevIndex = pswpInstance.currIndex;
        });
      },
    },
  ];

  const smallItemStyles: React.CSSProperties = {
    cursor: "pointer",
    objectFit: "cover",
    width: "100%",
    maxHeight: "100%",
  };

  const data =
    +images?.backdrops?.length! > 0
      ? [...images?.backdrops!]
      : peopleImages?.profiles;

  return (
    <Gallery uiElements={uiElements}>
      <div className={style.parent}>
        {data?.[0]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[0]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[0]?.file_path}`}
            width="1600"
            height="1600"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={{ cursor: "pointer" }}
                src={`https://image.tmdb.org/t/p/original${data?.[0]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={style.div1}
              />
            )}
          </Item>
        )}
        {data?.[1]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[1]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[1]?.file_path}`}
            width="1600"
            height="1066"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={smallItemStyles}
                src={`https://image.tmdb.org/t/p/original${data?.[1]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={style.div2}
              />
            )}
          </Item>
        )}
        {data?.[2]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[2]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[2]?.file_path}`}
            width="1600"
            height="1066"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={smallItemStyles}
                src={`https://image.tmdb.org/t/p/original${data?.[2]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={style.div3}
              />
            )}
          </Item>
        )}

        {data?.[3]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[3]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[3]?.file_path}`}
            width="1600"
            height="1066"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={smallItemStyles}
                src={`https://image.tmdb.org/t/p/original${data?.[3]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={style.div4}
              />
            )}
          </Item>
        )}
        {data?.[4]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[4]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[4]?.file_path}`}
            width="1600"
            height="1066"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={smallItemStyles}
                src={`https://image.tmdb.org/t/p/original${data?.[4]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={style.div5}
              />
            )}
          </Item>
        )}
        {data?.[5]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[5]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[5]?.file_path}`}
            width="1600"
            height="1066"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={smallItemStyles}
                src={`https://image.tmdb.org/t/p/original${data?.[5]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={`!hidden xs:!block ${style.div6}`}
              />
            )}
          </Item>
        )}
        {data?.[6]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[6]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[6]?.file_path}`}
            width="1600"
            height="1066"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={smallItemStyles}
                src={`https://image.tmdb.org/t/p/original${data?.[6]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={`!hidden xs:!block ${style.div7}`}
              />
            )}
          </Item>
        )}
        {data?.[7]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[7]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[7]?.file_path}`}
            width="1600"
            height="1066"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={smallItemStyles}
                src={`https://image.tmdb.org/t/p/original${data?.[7]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={`!hidden lg:!block ${style.div8}`}
              />
            )}
          </Item>
        )}
        {data?.[8]?.file_path && (
          <Item
            original={`https://image.tmdb.org/t/p/original${data?.[8]?.file_path}`}
            thumbnail={`https://image.tmdb.org/t/p/w300${data?.[8]?.file_path}`}
            width="1600"
            height="1066"
            alt={`image`}
          >
            {({ ref, open }) => (
              <img
                style={smallItemStyles}
                src={`https://image.tmdb.org/t/p/original${data?.[8]?.file_path}`}
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                alt="image"
                className={`!hidden lg:!block ${style.div9}`}
              />
            )}
          </Item>
        )}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;
