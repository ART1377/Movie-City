import React from 'react'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "People",
  description: "People Page of the Movie City Website",
};


type Props = {}

const page = (props: Props) => {
  return (
    <div>PeoplePage</div>
  )
}

export default page