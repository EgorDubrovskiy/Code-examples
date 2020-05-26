import * as constants from './constants';

const defaultState = {
  isMovieFavorites: false,
  addToFavoritesLoading: false,
  removeFromFavoritesLoading: false,
  error: null,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case constants.GET_IS_FAVORITES_SUCCESS:
      return { ...state, isMovieFavorites: payload };
    case constants.GET_IS_FAVORITES_FAIL:
      return { ...state, error: payload };
    case constants.ADD_TO_FAVORITES:
      return { ...state, addToFavoritesLoading: true };
    case constants.ADD_TO_FAVORITES_SUCCESS:
      return { ...state, isMovieFavorites: true, addToFavoritesLoading: false };
    case constants.ADD_TO_FAVORITES_FAIL:
      return { ...state, error: payload, addToFavoritesLoading: false };
    case constants.REMOVE_FROM_FAVORITES:
      return { ...state, removeFromFavoritesLoading: true };
    case constants.REMOVE_FROM_FAVORITES_SUCCESS:
      return { ...state, isMovieFavorites: false, removeFromFavoritesLoading: false };
    case constants.REMOVE_FROM_FAVORITES_FAIL:
      return { ...state, error: payload, removeFromFavoritesLoading: false };
    default:
      return state;
  }
}
