export const makeUnique = (data: any) => {
  const newData = data.filter((obj: any, index: number) => {
    return index === data.findIndex((o: any) => obj.id === o.id);
  });
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

export const sortAscending = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
        return a.vote_average - b.vote_average;
  });
  return newData;
};

export const sortDescending = (data: any) => {
  const newData = data.sort((a: any, b: any) => {
        return b.vote_average - a.vote_average;
  });
  return newData;
};