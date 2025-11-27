import React from 'react'
import Favorites from '../components/Favorites'
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Favorites",
  description: "Favorites Page contains all user's favorite people , movie and series",
};

type Props = {}

const page = (props: Props) => {
  return (
    <Favorites/>
  )
}

export default page