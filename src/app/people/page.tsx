import React from 'react'
import type { Metadata } from "next";
import People from '../components/people';


export const metadata: Metadata = {
  title: "People",
  description: "People Page of the Movie City Website",
};


type Props = {}
export const dynamic = "force-dynamic";

const page = (props: Props) => {
  return (
    <People/>
  )
}

export default page