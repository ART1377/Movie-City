import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// Define a type for the slice state
interface FavoriteState {
  favoriteSeries: number[];
  favoriteMovies: number[];
  favoritePeople: number[];
}

// Define the initial state using that type
const initialState: FavoriteState = {
  favoriteSeries: [],
  favoriteMovies: [],
  favoritePeople: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavoriteSeries: (state, action: PayloadAction<number>) => {
      if (state.favoriteSeries.find((item) => item == action.payload)) {
        return; // Do nothing when already in list!
      } else {
        state.favoriteSeries.push(action.payload);
      }
    },
    removeFromFavoriteSeries: (state, action: PayloadAction<number>) => {
      state.favoriteSeries = state.favoriteSeries.filter(
        (item) => item != action.payload
      );
    },
    addToFavoriteMovies: (state, action: PayloadAction<number>) => {
      if (state.favoriteMovies.find((item) => item == action.payload)) {
        return; // Do nothing when already in list!
      } else {
        state.favoriteMovies.push(action.payload);
      }
    },
    removeFromFavoriteMovies: (state, action: PayloadAction<number>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (item) => item != action.payload
      );
    },
    addToFavoritePeople: (state, action: PayloadAction<number>) => {
      if (state.favoritePeople.find((item) => item == action.payload)) {
        return; // Do nothing when already in list!
      } else {
        state.favoritePeople.push(action.payload);
      }
    },
    removeFromFavoritePeople: (state, action: PayloadAction<number>) => {
      state.favoritePeople = state.favoritePeople.filter(
        (item) => item != action.payload
      );
    },
  },
});

export const {
  addToFavoriteSeries,
  removeFromFavoriteSeries,
  addToFavoriteMovies,
  removeFromFavoriteMovies,
  addToFavoritePeople,
  removeFromFavoritePeople,
} = favoriteSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.favorite.favoriteSeries;

export default favoriteSlice.reducer;
