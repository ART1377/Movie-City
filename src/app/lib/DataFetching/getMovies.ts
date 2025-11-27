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
  genre = "",
  sort = "",
  adult = false,
  cast = "",
  crew = "",
  minDate = 1600,
  maxDate = 2030,
  minRate = 0,
  maxRate = 10,
  company = "",
) => {
  const castData = cast ? `&with_cast=${cast}` : "";
  const crewData = crew ? `&with_crew=${crew}` : "";
  const companyData = company ? `&with_companies=${company}` : "";
  const minDateData = minDate ? `&release_date.gte=${minDate}-01-01` : "";
  const maxDateData = maxDate ? `&release_date.lte=${maxDate}-01-01` : "";
  const minRateData = minRate ? `&vote_average.gte=${minRate}` : "";
  const maxRateData = maxRate ? `&vote_average.lte=${maxRate}` : "";
  const sortData = sort ? `&sort_by=${sort}` : "";
  const genreData = genre ? `&with_genres=${genre}` : "";

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=${adult}&page=${page}${companyData}${minDateData}${maxDateData}${sortData}${minRateData}${maxRateData}${castData}${crewData}${genreData}`,
    options
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Movies");
  }
  const data: MoviesList = await res.json();
  return data;
};

export default getMovies;
