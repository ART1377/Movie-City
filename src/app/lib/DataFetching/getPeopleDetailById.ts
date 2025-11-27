import { PeopleDetail } from "../../../../next-type-d";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2JlYzkxM2M1ZGY0YWJjYzFhYWQ4ZGQ1YTNkNDZhNiIsInN1YiI6IjY0Y2Y1OTVmMzAzYzg1MDExZGQ0MDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kZ6dqa2QQYzCOPXkJjglZO3f1mngnN_-8IjNHuXRIfA",
  },
  next: { revalidate: 60 * 60 * 24 },

};

const getPeopleDetailById = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?append_to_response=images&language=en-US`,
    options
  );

  if (!res.ok) undefined
  const data: PeopleDetail = await res.json();
  return data;
};

export default getPeopleDetailById;
