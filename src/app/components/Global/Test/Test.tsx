import React from "react";

type Props = {};

const Test = (props: Props) => {
  return (
    <>
      {/*
      // Select Option
      <div>
          <label
            htmlFor="underline_select"
            className="text-xs bg-bg-body absolute -mt-2 ml-1 px-1 text-main-green"
          >
            Category
          </label>
          <select
            id="underline_select"
            className="block text-center py-2 px-3 rounded w-fit text-sm text-text-dark bg-transparent border border-main-green  dark:text-gray-400 dark:border-main-green focus:outline-none focus:ring-0 peer"
            // onChange={(e) => setCurrent(+e?.target?.value as any)}
            // value={current}
          >
            <option value={"movie"}>movie</option>
            <option value={"person"}>person</option>
            <option value={"tv"}>series</option>
          </select>
        </div> */}

      {/* 
        
// Get All Search Results in order to implement sort
  useEffect(() => {
    async function getAllResults() {
      const array = Array.from(
        { length: results?.total_pages! },
        (v, i) => i + 1
      );

      array.map(async (item) => {
        const allData = await getSearchResultsByQuery(item.toString(), query!);
        setAllResults((prev: any) => [...prev, ...allData.results]);
      });
    }
    getAllResults();
  }, [query, results?.total_pages]);
        */}
    </>
  );
};

export default Test;
