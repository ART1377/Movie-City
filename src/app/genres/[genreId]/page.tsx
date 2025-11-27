import React from "react";
import {
  Image,
  PeopleCombinedCredits,
  PeopleDetail,
  PeopleList,
} from "../../../../next-type-d";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Genres from "@/app/components/Genres";
import getGenreNameByGenreId, { genres } from "@/app/lib/DataFetching/getGenreNameByGenreId";

// Generate Static Params
export async function generateStaticParams() {

  return genres.map((item) => ({
    genreId: item.id.toString(),
  }));
}

type Props = {
  params: {
    genreId: number;
  };
};

// Generate Metadata
export async function generateMetadata({
  params: { genreId },
}: Props) {
  const detail = getGenreNameByGenreId(+genreId);
  
  if (!detail){
    return {
      title: 'Not Found',
      description: `Not Found Page`,
    };
  }
  return {
    title: detail,
    description: `This is a page of ${detail} genre`,
  };
}

const page = async ({ params: { genreId } }: Props) => {
  const detail = getGenreNameByGenreId(+genreId);
  if (!detail) return notFound()


  return (
    <>
      <Genres genreId={genreId} genreName={detail} />
    </>
  );
};

export default page;
