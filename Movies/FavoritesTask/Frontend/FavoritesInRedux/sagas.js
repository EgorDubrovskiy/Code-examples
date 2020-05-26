import axios from 'axios';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import { getFavoritesApiHost } from 'utils/api/api';
import getUserLang from 'redux/helpers/getUserLang';
import getAuthorizationSettings from 'redux/helpers/getAuthorizationSettings';
import * as constants from './constants';
import {
  getIsFavoritesSuccess,
  getIsFavoritesFail,
  addToFavoritesSuccess,
  addToFavoritesFail,
  removeFromFavoritesSuccess,
  removeFromFavoritesFail,
} from './actions';

function* getIsFavorites(action) {
  try {
    const { userId, movieId } = action.payload;
    const apiHost = yield call(getFavoritesApiHost, yield call(getUserLang));
    const url = `${apiHost}/is_favorites?user_id=${userId}&movie_id=${movieId}`;
    const requestSettings = yield call(getAuthorizationSettings);

    const {
      data: { data: isFavorites },
    } = yield axios.get(url, requestSettings);

    yield put(getIsFavoritesSuccess(isFavorites));
  } catch (e) {
    yield put(getIsFavoritesFail(e.message));
  }
}

function* addToFavorites(action) {
  try {
    const url = yield call(getFavoritesApiHost, yield call(getUserLang));
    const { userId, movieId } = action.payload;
    const requestParams = { user_id: userId, movie_id: movieId };
    const requestSettings = yield call(getAuthorizationSettings);

    yield axios.post(url, requestParams, requestSettings);

    yield put(addToFavoritesSuccess());
  } catch (e) {
    yield put(addToFavoritesFail(e.message));
  }
}

function* removeFromFavorites(action) {
  try {
    const url = yield call(getFavoritesApiHost, yield call(getUserLang));
    const { userId, movieId } = action.payload;
    const requestParams = { user_id: userId, movie_id: movieId };
    const requestSettings = yield call(getAuthorizationSettings);
    const requestConfig = { ...requestSettings, ...{ data: requestParams } };

    yield axios.delete(url, requestConfig);

    yield put(removeFromFavoritesSuccess());
  } catch (e) {
    yield put(removeFromFavoritesFail(e.message));
  }
}

export default function* favoritesSagas() {
  yield all([
    takeLatest(constants.GET_IS_FAVORITES, getIsFavorites),
    takeLatest(constants.ADD_TO_FAVORITES, addToFavorites),
    takeLatest(constants.REMOVE_FROM_FAVORITES, removeFromFavorites),
  ]);
}
