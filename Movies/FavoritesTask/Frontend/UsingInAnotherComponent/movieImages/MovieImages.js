import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AwesomeSlider from 'react-awesome-slider';
import { TMDB_MOVIES_LIST_IMG_URL } from 'constants/api';
import Rating from 'components/common/parts/rating';
import Favorites from 'components/common/parts/favorites/Favorites';

import 'react-awesome-slider/dist/styles.css';
import styles from './MovieImages.styles';

class MovieImages extends Component {
  componentDidMount() {
    this.getIsFavorites();
  }

  componentDidUpdate(prevProps) {
    const { movieData } = this.props;

    if (movieData.id !== prevProps.movieData.id) {
      this.getIsFavorites();
    }
  }

  getIsFavorites = () => {
    const { getIsFavorites, movieData, userId } = this.props;

    if (userId) {
      getIsFavorites(userId, movieData.id);
    }
  };

  renderPoster = image => {
    return <div key={image.file_path} data-src={`${TMDB_MOVIES_LIST_IMG_URL}${image.file_path}`} />;
  };

  renderMainPoster = () => {
    const {
      movieData: { poster_path: posterPath, title },
    } = this.props;

    return <img alt={title} src={`${TMDB_MOVIES_LIST_IMG_URL}${posterPath}`} />;
  };

  renderFavorites = () => {
    const {
      movieData: { id: movieId, title: movieTitle },
      classes,
      isMovieFavorites,
      userId,
      addToFavorites,
      removeFromFavorites,
      addToFavoritesLoading,
      removeFromFavoritesLoading,
    } = this.props;

    return (
      userId && (
        <Box className={classes.favorites}>
          <Favorites
            isFavorites={isMovieFavorites}
            addLoading={addToFavoritesLoading}
            removeLoading={removeFromFavoritesLoading}
            onAddHandler={() => addToFavorites(userId, movieId)}
            onRemoveHandler={() => removeFromFavorites(userId, movieId)}
            movieName={movieTitle}
          />
        </Box>
      )
    );
  };

  renderSlider = () => {
    const {
      movieData: {
        images: { posters: movieImages },
      },
      classes,
    } = this.props;
    const slides = movieImages
      .sort((a, b) => (a.vote_average > b.vote_average ? -1 : 1))
      .slice(0, 5);

    return (
      <AwesomeSlider className={classes.slider} bullets={false}>
        {slides.map(image => this.renderPoster(image))}
      </AwesomeSlider>
    );
  };

  render() {
    const {
      movieData: {
        images: { posters: movieImages },
      },
      classes,
      voteAverage,
    } = this.props;

    return (
      <Container className={classes.root}>
        <div className={classes.posters}>
          {Object.keys(movieImages).length > 0 ? this.renderSlider() : this.renderMainPoster()}
          <Rating rating={voteAverage} className={classes.rating} stylePosition="absolute" />
          {this.renderFavorites()}
        </div>
      </Container>
    );
  }
}

MovieImages.propTypes = {
  classes: PropTypes.object.isRequired,
  getIsFavorites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  isMovieFavorites: PropTypes.bool.isRequired,
  addToFavoritesLoading: PropTypes.bool.isRequired,
  removeFromFavoritesLoading: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  movieData: PropTypes.object,
  voteAverage: PropTypes.number,
};

MovieImages.defaultProps = {
  userId: null,
  movieData: {},
  voteAverage: 0,
};

export default withStyles(styles)(MovieImages);
