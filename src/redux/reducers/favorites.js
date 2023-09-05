import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    loadFavorite: (state, { payload }) => {
      state = payload;
    },
    removeFavorite: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      AsyncStorage.setItem("favorites", JSON.stringify(newState));
      return newState;
    },
    addFavorite: (state, action) => {
      const newState = [...state, action.payload];
      AsyncStorage.setItem("favorites", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { loadFavorite, addFavorite, removeFavorite } = favoriteSlice.actions;
export const favorites = (state) => state.favorite;
export default favoriteSlice.reducer;
