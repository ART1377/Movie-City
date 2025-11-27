import type { Metadata } from "next";
import SearchResultsPage from "../components/SearchResult/SearchResultsPage";

export const metadata: Metadata = {
  title: "Results Page",
  description: "all results page based query",
};

type Props = {};

export const dynamic = "force-dynamic";

const Page = (props: Props) => {
  return (
    <>
      <SearchResultsPage />
    </>
  );
};

export default Page;
