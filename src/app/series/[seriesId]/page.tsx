import getSeriesDetailById from "@/app/lib/DataFetching/getSeriesDetailById";
import React from "react";
import { Image, SeriesDetail, SeriesList } from "../../../../next-type-d";
import SeriesDetailPage from "@/app/components/Series/SeriesDetailPage";
import type { Metadata } from "next";
import getSeriesImagesById from "@/app/lib/DataFetching/getSeriesImagesById";
import getTrendingSeries from "@/app/lib/DataFetching/getTrendingSeries";
import getTopRatedSeries from "@/app/lib/DataFetching/getTopRatedSeries";
import { series } from "@/app/data";
import getPopularSeries from "@/app/lib/DataFetching/getPopularSeries";
import { notFound } from "next/navigation";

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

  if (!detail.name||!detail.id){
    return {
      title: 'Not Found',
      description: `Not Found Page`,
    };
  }

  return {
    title: detail.name,
    description: `This is a page of ${detail.name} detail`,
  };
}

const page = async ({ params: { seriesId } }: Props) => {
  const detail = (await getSeriesDetailById(seriesId)) as SeriesDetail;
  const images = (await getSeriesImagesById(seriesId)) as Image;


  if (!detail.name||!detail.id) return notFound()


  return (
    <>
      <SeriesDetailPage series={detail} images={images} />
    </>
  );
};

export default page;
