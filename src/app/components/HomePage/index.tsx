import React from "react";
import TrendingPeople from "./TrendingPeople";
import TrendingSeries from "./TrendingSeries";
import Hero from "./Hero";
import Companies from "./Companies";
import TrendingMovies from "./TrendingMovies";
import getTrendingSeries from "@/app/lib/getTrendingSeries";
import type {
  Movie,
  People,
  Series,
  MoviesList,
  PeopleList,
  SeriesList,
} from "../../../../next-type-d";
import getTrendingMovies from "@/app/lib/getTrendingMovies";
import getTrendingPeople from "@/app/lib/getTrendingPeople";
import UpcomingMovies from "./UpcomingMovies";
import getUpcomingMovies from "@/app/lib/getUpcomingMovies";
import PopularSeries from "./PopularSeries";
import getPopularSeries from "@/app/lib/getPopularSeries";
import getTopRatedSeries from "@/app/lib/getTopRatedSeries";
import TopRatedSeries from "./TopRatedSeries";
import TopRatedMovies from "./TopRatedMovies";
import getTopRatedMovies from "@/app/lib/getTopRatedMovies";

type Props = {};

const HomePage = async (props: Props) => {
  const trendingSeriesData = (await getTrendingSeries()) as
    | SeriesList
    | undefined;
  const trendingMoviesData = (await getTrendingMovies()) as
    | MoviesList
    | undefined;
  const trendingPeopleData = (await getTrendingPeople()) as
    | PeopleList
    | undefined;

  const upcomingMoviesData = (await getUpcomingMovies()) as
    | MoviesList
    | undefined;
  const popularSeriesData = (await getPopularSeries()) as
    | SeriesList
    | undefined;
  const topRatedSeriesData = (await getTopRatedSeries()) as
    | SeriesList
    | undefined;
  const topRatedMoviesData = (await getTopRatedMovies()) as
    | MoviesList
    | undefined;
  return (
    <>
      <Hero />
      <TrendingSeries data={trendingSeriesData?.results as Series[]} />
      <TrendingMovies data={trendingMoviesData?.results as Movie[]} />
      <TrendingPeople data={trendingPeopleData?.results as People[]} />
      <TopRatedSeries data={topRatedSeriesData?.results as Series[]} />
      <PopularSeries data={popularSeriesData?.results as Series[]} />
      <TopRatedMovies data={topRatedMoviesData?.results as Movie[]} />
      <UpcomingMovies data={upcomingMoviesData?.results as Movie[]} />
      <Companies />
    </>
  );
};

export default HomePage;
