import * as constants from './constants';

export const getIsFavorites = (userId, movieId) => ({
  type: constants.GET_IS_FAVORITES,
  payload: { userId, movieId },
});

export const getIsFavoritesSuccess = isFavorite => ({
  type: constants.GET_IS_FAVORITES_SUCCESS,
  payload: isFavorite,
});

export const getIsFavoritesFail = error => ({
  type: constants.GET_IS_FAVORITES_FAIL,
  payload: error,
});

export const addToFavorites = (userId, movieId) => ({
  type: constants.ADD_TO_FAVORITES,
  payload: { userId, movieId },
});

export const addToFavoritesSuccess = () => ({
  type: constants.ADD_TO_FAVORITES_SUCCESS,
});

export const addToFavoritesFail = error => ({
  type: constants.ADD_TO_FAVORITES_FAIL,
  payload: error,
});

export const removeFromFavorites = (userId, movieId) => ({
  type: constants.REMOVE_FROM_FAVORITES,
  payload: { userId, movieId },
});

export const removeFromFavoritesSuccess = () => ({
  type: constants.REMOVE_FROM_FAVORITES_SUCCESS,
});

export const removeFromFavoritesFail = error => ({
  type: constants.REMOVE_FROM_FAVORITES_FAIL,
  payload: error,
});
