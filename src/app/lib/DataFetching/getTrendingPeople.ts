import { PeopleList } from "../../../../next-type-d";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2JlYzkxM2M1ZGY0YWJjYzFhYWQ4ZGQ1YTNkNDZhNiIsInN1YiI6IjY0Y2Y1OTVmMzAzYzg1MDExZGQ0MDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kZ6dqa2QQYzCOPXkJjglZO3f1mngnN_-8IjNHuXRIfA",
  },
  next: { revalidate: 60 * 60 * 24 },
};

const getTrendingPeople = async (page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/person/day?language=en-US&page=${page}`,
    options
  );
  if (!res.ok) {
    throw new Error("Failed to fetch TrendingPeople");
  }
  const data: PeopleList = await res.json();
  return data;
};

export default getTrendingPeople;
