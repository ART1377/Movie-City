import React from "react";
import { Cast, Crew } from "../../../../../next-type-d";
import Img from "../Img";
import Link from "next/link";

type Props = {
  cast?: Cast;
  crew?: Crew;
};

const CastCard = ({ cast, crew }: Props) => {
  return (
    <Link href={`/people/${cast?.id ? cast.id : crew?.id} `}>
      <div className="flex items-center gap-2 bg-white p-2 rounded-full min-w-[200px] shadow-lg hover:shadow-none">
        <div className="relative !w-14 !h-14 rounded-full overflow-hidden">
          <Img
            url={cast?.profile_path ? cast?.profile_path : crew?.profile_path!}
            alternative={`${cast?.name ? cast.name : crew?.name} image`}
            size="w45"
            style="!w-14 !h-14"
          />
        </div>
        <div className="text-text-dark">
          <p className="text-sm line-clamp-1">
            {cast?.name ? cast.name : crew?.name}
          </p>
          <small className="opacity-80 line-clamp-1">
            {cast?.character ? cast.character : crew?.department}
          </small>
        </div>
      </div>
    </Link>
  );
};

export default CastCard;
