import { MoviesList } from "../../../../next-type-d";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2JlYzkxM2M1ZGY0YWJjYzFhYWQ4ZGQ1YTNkNDZhNiIsInN1YiI6IjY0Y2Y1OTVmMzAzYzg1MDExZGQ0MDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kZ6dqa2QQYzCOPXkJjglZO3f1mngnN_-8IjNHuXRIfA",
  },
};

const getMovies = async (
  page = 1,
  cast='',
  minDate= 1800,
  maxDate= 2030,
  minRate= 0,
  maxRate= 10,
  genre= "",
  sort= ""
) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}&release_date.gte=${minDate}-01-01&release_date.lte=${maxDate}-01-01&sort_by=${sort}&vote_average.gte=${minRate}&vote_average.lte=${maxRate}&with_cast=${cast}&with_genres=${genre}`,
    options
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Movies");
  }
  const data: MoviesList = await res.json();
  return data;
};

export default getMovies;
