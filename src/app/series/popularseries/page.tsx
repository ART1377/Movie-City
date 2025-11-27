import PopularSeriesPage from "@/app/components/Series/PopularSeriesPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Popular Series",
  description: "Popular Series page which contains hundreds of popular series",
};


type Props = {}

const page =async (props: Props) => {



  return (
    <>
    <PopularSeriesPage/>
    </>
  )
}

export default page