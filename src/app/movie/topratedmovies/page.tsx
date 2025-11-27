import TopRatedMovies from "@/app/components/movie/TopRatedMoviesPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "TopRated Movies",
  description: "TopRated Movies page which contains hundreds of top rated movies",
};


type Props = {}

const page =async (props: Props) => {



  return (
    <>
    <TopRatedMovies/>
    </>
  )
}

export default page