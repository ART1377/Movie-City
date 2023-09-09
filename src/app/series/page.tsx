import type { Metadata } from "next";
import SeriesPage from "../components/Series";


export const metadata: Metadata = {
  title: "Series",
  description: "Series Page of the Movie City Website",
};


type Props = {}

const page = (props: Props) => {
  return (
    <h1>
      <SeriesPage/>
    </h1>
  )
}

export default page