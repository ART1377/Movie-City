import getSeriesDetailById from "@/app/lib/getSeriesDetailById";
import React from "react";
import { Image, SeriesDetail, SeriesList } from "../../../../next-type-d";
import SeriesDetailPage from "@/app/components/Series/SeriesDetailPage";
import type { Metadata } from "next";
import getSeriesImagesById from "@/app/lib/DataFetching/getSeriesImagesById";
import getTrendingSeries from "@/app/lib/DataFetching/getTrendingSeries";
import getTopRatedSeries from "@/app/lib/getTopRatedSeries";
import { series } from "@/app/data";
import getPopularSeries from "@/app/lib/getPopularSeries";

// Generate Static Params
export async function generateStaticParams() {
  const trendingSeriesData = (await getTrendingSeries()) as
    | SeriesList
    | undefined;

  const topRatedSeriesData = (await getTopRatedSeries()) as
    | SeriesList
    | undefined;

  const popularSeriesData = (await getPopularSeries()) as
    | SeriesList
    | undefined;

  const seriesData = [
    ...trendingSeriesData?.results!,
    ...topRatedSeriesData?.results!,
    ...popularSeriesData?.results!,
    ...series,
  ];

  return seriesData.map((item) => ({
    seriesId: item.id.toString(),
  }));
}

type Props = {
  params: {
    seriesId: number;
  };
};

// Generate Metadata
export async function generateMetadata({
  params: { seriesId },
}: Props): Promise<Metadata> {
  const detail = (await getSeriesDetailById(seriesId)) as SeriesDetail;

  return {
    title: detail.name,
    description: `This is a page of ${detail.name} detail`,
  };
}

const page = async ({ params: { seriesId } }: Props) => {
  const detail = (await getSeriesDetailById(seriesId)) as SeriesDetail;
  const images = (await getSeriesImagesById(seriesId)) as Image;
  return (
    <>
      <SeriesDetailPage series={detail} images={images} />
    </>
  );
};

export default page;
