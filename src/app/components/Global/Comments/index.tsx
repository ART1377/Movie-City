import React, { useState } from "react";
import { Author } from "../../../../../next-type-d";
import Img from "../Img";
import { BsFillStarFill, BsEmojiSmileUpsideDown } from "react-icons/bs";
import Button from "../Button";
import Time from "../TimeAgo";

type Props = {
  authors: Author[];
};

const Comments = ({ authors }: Props) => {
  const [count, setCount] = useState<number>(5);

  if (!authors?.length) {
    return (
      <div className="items-center text-center w-fit mx-auto mt-8 p-8 px-14 bg-bg-white rounded-2xl">
        <h6>No comments yet</h6>
        <p>You can be first !</p>
        <BsEmojiSmileUpsideDown className="text-main-green text-5xl mx-auto mt-3" />
      </div>
    );
  }

  const clickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLInputElement;
    target.classList.toggle("line-clamp-4");
  };

  const loadMore = () => {
    if (+authors.length < +count && +count > 5) {
      setCount(5);
    } else {
      setCount((prev) => +prev + 5);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-16 gap-x-8 mt-14">
        {authors?.map((author: Author, index: number) => {
          if (index < count) {
            return (
              <div
                key={author?.id}
                className="relative text-center bg-bg-white rounded-2xl pb-3 pt-12 w-full max-w-[500px] lg:max-w-[700px] "
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-16 w-16 rounded-full overflow-hidden">
                  <Img
                    url={author?.author_details?.avatar_path!}
                    alternative={`${author?.author_details?.username} avatar`}
                    size="w45"
                  />
                </div>
                <p
                  onClick={(e) => clickHandler(e)}
                  className="line-clamp-4 px-4 xs:px-12 cursor-pointer"
                >
                  {author?.content}
                </p>
                <div className="border-t mt-4 pt-2">
                  <h6>{author?.author_details?.username}</h6>
                  <div className="flex justify-between px-3 pt-3">
                    <span>
                      <Time
                        date={
                          author?.updated_at
                            ? author?.updated_at
                            : author?.created_at
                        }
                      />
                    </span>
                    <span className="flex gap-0.5 items-center text-sm">
                      <BsFillStarFill className="text-text-light" />
                      {author?.author_details?.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <Button
          onClick={loadMore}
          type="button"
          btnType="main"
          css={`-mt-5 ${+authors?.length <= 5 && "!hidden"}`}
        >
          {+authors?.length < +count && +count > 5 ? "Show Less" : "Show More"}
        </Button>
      </div>
    </>
  );
};

export default Comments;
