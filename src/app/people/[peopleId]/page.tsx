import React from "react";
import {
  Image,
  PeopleCombinedCredits,
  PeopleDetail,
  PeopleList,
} from "../../../../next-type-d";
import type { Metadata } from "next";
import getTrendingPeople from "@/app/lib/DataFetching/getTrendingPeople";
import getPeopleDetailById from "@/app/lib/DataFetching/getPeopleDetailById";
import getPeopleCombinedCreditsById from "@/app/lib/DataFetching/getPeopleCombinedCreditsById";
import PeopleDetailPage from "@/app/components/people/PeopleDetailPage";
import { notFound } from "next/navigation";

// Generate Static Params
export async function generateStaticParams() {
  const trendingPeopleData = (await getTrendingPeople()) as
    | PeopleList
    | undefined;

  const people = [...trendingPeopleData?.results!];

  return people.map((item) => ({
    peopleId: item.id.toString(),
  }));
}

type Props = {
  params: {
    peopleId: number;
  };
};

// Generate Metadata
export async function generateMetadata({
  params: { peopleId },
}: Props): Promise<Metadata> {
  const detail = (await getPeopleDetailById(peopleId)) as PeopleDetail;
  
  if (!detail.name||!detail.id){
    return {
      title: 'Not Found',
      description: `Not Found Page`,
    };
  }
  return {
    title: detail.name,
    description: `This is a page of ${detail.name} detail`,
  };
}

const page = async ({ params: { peopleId } }: Props) => {
  const detail = (await getPeopleDetailById(peopleId)) as PeopleDetail;
  const credits = (await getPeopleCombinedCreditsById(
    peopleId
  )) as PeopleCombinedCredits;


  if (!detail.name||!detail.id) return notFound()


  return (
    <>
      <PeopleDetailPage people={detail} credits={credits} />
    </>
  );
};

export default page;
