import TopRatedSeries from "@/app/components/Series/TopRatedSeries";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "TopRated Series",
  description: "TopRated Series page which contains hundreds of top rated series",
};


type Props = {}

const page =async (props: Props) => {



  return (
    <>
    <TopRatedSeries/>
    </>
  )
}

export default page