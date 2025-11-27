import TrendingMoviesPage from "@/app/components/movie/TrendingMoviesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending Movies",
  description:
    "Trending Movies page which contains hundreds of trending movies",
};

type Props = {};

const page = async (props: Props) => {
  return (
    <>
      <TrendingMoviesPage />
    </>
  );
};

export default page;
