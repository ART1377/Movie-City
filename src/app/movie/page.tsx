import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Movies",
  description: "Movies Page of the Movie City App",
};


type Props = {}

const page = (props: Props) => {
  return (
    <div>MoviesPage</div>
  )
}

export default page