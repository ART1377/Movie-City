import type { Metadata } from "next";
import MoviePage from "../components/movie";


export const metadata: Metadata = {
  title: "Movies",
  description: "Movies Page of the Movie City Website",
};


type Props = {}
export const dynamic = "force-dynamic";

const page = (props: Props) => {
  return (
    <MoviePage/>
  )
}

export default page