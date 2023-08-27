"use client";
import React from "react";
import SectionDevider from "../../Global/SectionDevider";
import Slider from "../../Global/Slider";
import SeriesCard from "../../Global/SeriesCard";
import { SwiperSlide } from "swiper/react";
import { Series } from "../../../../../next-type-d";

type Props = {
  data: Series[];
};

const TrendingSeries = ({ data }: Props) => {
  // const [data, setData] = useState<Series[]>();

  // useEffect(() => {
  //   async function getData() {
  //     const info:TrendingSeriesType|undefined = await getTrendingSeries();
  //     setData(info?.results);
  //   }
  //   getData()
  // }, []);

  return (
    <>
      <section className="mb-12">
        <SectionDevider title="Trending Series" path="/series/trendingseries" />
        <Slider>
          {data?.map((item: Series) => {
            return (
              <SwiperSlide key={item.id}>
                <SeriesCard series={item} imageSize="w185" />
              </SwiperSlide>
            );
          })}
        </Slider>
      </section>
    </>
  );
};

export default TrendingSeries;
