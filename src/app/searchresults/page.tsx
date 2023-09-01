"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import getSearchResultsByQuery from "../lib/getSearchResultsByQuery";
import { SearchResult, SearchResults } from "../../../next-type-d";
import SearchItem from "../components/Global/SearchItem";
import Title from "../components/Global/Title";

// Pagination dependencies
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/bootstrap.css";

type Props = {};

const Page = (props: Props) => {
  const [results, setResults] = useState<SearchResults>();

  const router = useRouter();

  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(+page!);
  const totalPages = results?.total_pages!;


  useEffect(() => {
    async function getResults() {
      const data = await getSearchResultsByQuery(page!, query!);
      setResults(data);
    }
    getResults();

    // Change Query by Pagination
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", currentPage.toString());
    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathName);

    return () => {};
  }, [query, page, router, currentPage]);

  return (
    <>
      <Title withLine>{`all Results form ${query}`}</Title>
      <div className="flex flex-wrap justify-around gap-4 mt-4 mb-8 mx-auto">
        {results?.results?.map((result: SearchResult) => {
          return (
            <div
              key={result.id}
              className="w-full xm:w-[45%] max-w-[500px] bg-white rounded-2xl"
            >
              <SearchItem result={result} />
            </div>
          );
        })}
      </div>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
        extraClassName="pb-40 mx-auto"
        maxWidth={260}
      />
    </>
  );
};

export default Page;
