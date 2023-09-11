import { People } from "../../../../next-type-d";

export const makeUnique = (data: any) => {
  const newData = data.filter((obj: any, index: number) => {
    return index === data.findIndex((o: any) => obj.id === o.id);
  });
  return newData;
};

export const filterByGender = (data: any, gen: number) => {
  const newData = data.filter((item: any) => item.gender == gen.toString());
  return newData;
};


export const sortAlphabatically = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
    if (data[0].name) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    } else {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
  });
  return newData;
};

export const sortAscendingBasedPopularity = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
    return a.popularity - b.popularity;
  });
  return newData;
};

export const sortDescendingBasedPopularity = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
    return b.popularity - a.popularity;
  });
  return newData;
};

export const sortAscendingBasedRate = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
    return a.vote_average - b.vote_average;
  });
  return newData;
};

export const sortDescendingBasedRate = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
    return b.vote_average - a.vote_average;
  });
  return newData;
};

export const sortAscendingBasedDate = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
    if (a?.first_air_date || b?.first_air_date) {
      return a.first_air_date?.split("-")[0] - b.first_air_date?.split("-")[0];
    }
    if (a?.release_date || b?.release_date) {
      return a.release_date?.split("-")[0] - b.release_date?.split("-")[0];
    }
  });
  return newData;
};

export const sortDescendingBasedDate = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
    if (a?.first_air_date || b?.first_air_date) {
      return b.first_air_date?.split("-")[0] - a.first_air_date?.split("-")[0];
    }
    if (a?.release_date || b?.release_date) {
      return b.release_date?.split("-")[0] - a.release_date?.split("-")[0];
    }
  });
  return newData;
};

export const sortArray = (sortBy: string, data: any[]) => {
  const newData =
    sortBy == "alphabet"
      ? sortAlphabatically(data)
      : sortBy == "popularity.desc"
      ? sortDescendingBasedPopularity(data)
      : sortBy == "popularity.asc"
      ? sortAscendingBasedPopularity(data)
      : sortBy == "rate.desc"
      ? sortDescendingBasedRate(data)
      : sortBy == "rate.asc"
      ? sortAscendingBasedRate(data)
      : sortBy == "date.desc"
      ? sortDescendingBasedDate(data)
      : sortBy == "date.asc"
      ? sortAscendingBasedDate(data)
      : data;

  return newData;
};
