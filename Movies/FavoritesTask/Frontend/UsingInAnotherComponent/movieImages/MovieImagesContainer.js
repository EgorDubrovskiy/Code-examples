import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getIsFavorites,
  addToFavorites,
  removeFromFavorites,
} from 'redux/modules/favorites/actions';
import { selectUserId } from 'redux/modules/user/selectors';
import MovieImages from './MovieImages';

const mapStateToProps = state => ({
  movieData: state.movies.movieData,
  isMovieFavorites: state.favorites.isMovieFavorites,
  addToFavoritesLoading: state.favorites.addToFavoritesLoading,
  removeFromFavoritesLoading: state.favorites.removeFromFavoritesLoading,
  userId: selectUserId(state),
});

const mapDispatchToProps = {
  getIsFavorites,
  addToFavorites,
  removeFromFavorites,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(compose(withConnect)(MovieImages));
