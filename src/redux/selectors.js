export const isItemInFavorites = (state, itemId) => {
  return state.favorites.some((item) => item.id === itemId);
};
