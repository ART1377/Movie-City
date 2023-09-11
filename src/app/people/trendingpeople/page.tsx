import TrendingPeoplePage from '../../components/people/TrendingPeoplePage/index'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending People",
  description:
    "Trending People page which contains tens of trending people",
};

type Props = {};

const page = async (props: Props) => {
  return (
    <>
      <TrendingPeoplePage />
    </>
  );
};

export default page;
