import { configureStore } from "@reduxjs/toolkit";
import favorites from "./reducers/favorites";

export const store = configureStore({
  reducer: {
    favorites,
  },
});
