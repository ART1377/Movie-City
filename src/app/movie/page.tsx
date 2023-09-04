import type { Metadata } from "next";
import Movie from "../components/movie";


export const metadata: Metadata = {
  title: "Movies",
  description: "Movies Page of the Movie City Website",
};


type Props = {}

const page = (props: Props) => {
  return (
    <Movie/>
  )
}

export default page