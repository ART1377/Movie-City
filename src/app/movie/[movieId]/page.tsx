import React from "react";
import { Image, MoviesList, MovieDetail } from "../../../../next-type-d";
import type { Metadata } from "next";
import getTrendingMovies from "@/app/lib/DataFetching/getTrendingMovies";
import getTopRatedMovies from "@/app/lib/DataFetching/getTopRatedMovies";
import getUpcomingMovies from "@/app/lib/DataFetching/getUpcomingMovies";
import getMovieDetailById from "@/app/lib/DataFetching/getMovieDetailById";
import getMovieImagesById from "@/app/lib/DataFetching/getMovieImagesById";
import MovieDetailPage from "@/app/components/movie/MovieDetailPage";
import { notFound } from "next/navigation";

// Generate Static Params
export async function generateStaticParams() {
  const trendingMoviesData = (await getTrendingMovies()) as
    | MoviesList
    | undefined;

  const topRatedMoviesData = (await getTopRatedMovies()) as
    | MoviesList
    | undefined;

  const upcomingMoviesData = (await getUpcomingMovies()) as
    | MoviesList
    | undefined;

  const movies = [
    ...trendingMoviesData?.results!,
    ...topRatedMoviesData?.results!,
    ...upcomingMoviesData?.results!,
  ];

  return movies.map((item) => ({
    moviesId: item.id.toString(),
  }));
}

type Props = {
  params: {
    movieId: number;
  };
};

// Generate Metadata
export async function generateMetadata({
  params: { movieId },
}: Props): Promise<Metadata> {
  const detail = (await getMovieDetailById(movieId)) as MovieDetail;

  if (!detail.title||!detail.id){
    return {
      title: 'Not Found',
      description: `Not Found Page`,
    };
  }

  return {
    title: detail.title,
    description: `This is a page of ${detail.title} detail`,
  };
}

const page = async ({ params: { movieId } }: Props) => {
  const detail = (await getMovieDetailById(movieId)) as MovieDetail;
  const images = (await getMovieImagesById(movieId)) as Image;

  if (!detail.title||!detail.id) return notFound()



  return (
    <>
      <MovieDetailPage movie={detail} images={images} />
    </>
  );
};

export default page;
