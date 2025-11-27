import TrendingSeriesPage from "@/app/components/Series/TrendingSeriesPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Trending Series",
  description: "Trending Series page which contains hundreds of trending series",
};


type Props = {}

const page =async (props: Props) => {



  return (
    <>
    <TrendingSeriesPage/>
    </>
  )
}

export default page