import { SearchResults } from "../../../../next-type-d";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2JlYzkxM2M1ZGY0YWJjYzFhYWQ4ZGQ1YTNkNDZhNiIsInN1YiI6IjY0Y2Y1OTVmMzAzYzg1MDExZGQ0MDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kZ6dqa2QQYzCOPXkJjglZO3f1mngnN_-8IjNHuXRIfA",
  },
};

const getSearchResultsByQuery = async (page = '1', query: string,category='multi') => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/${category}?query=${query}&include_adult=false&language=en-US&page=${page}`,
    options
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Results");
  }
  const data: SearchResults = await res.json();
  return data;
};

export default getSearchResultsByQuery;
