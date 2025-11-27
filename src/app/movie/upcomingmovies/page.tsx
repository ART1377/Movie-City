import UpcomingMoviesPage from "@/app/components/movie/UpcomingMoviesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Movies",
  description:
    "Upcoming Movies page which contains hundreds of upcoming movies",
};

type Props = {};

const page = async (props: Props) => {
  return (
    <>
      <UpcomingMoviesPage />
    </>
  );
};

export default page;
