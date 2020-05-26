import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import { LocaleContext } from 'contexts/LocaleContext';

import styles from './Favorites.styles';

class Favorites extends Component {
  componentDidUpdate = prevProps => {
    const { enqueueSnackbar, movieName, addLoading, removeLoading } = this.props;
    const { favorites: locale } = this.context;

    if (prevProps.addLoading && !addLoading) {
      enqueueSnackbar(`${movieName} ${locale.addedMessage}`, { variant: 'success' });
    } else if (prevProps.removeLoading && !removeLoading) {
      enqueueSnackbar(`${movieName} ${locale.removedMessage}`, { variant: 'success' });
    }
  };

  renderFavorites = () => {
    const { classes, onRemoveHandler } = this.props;
    const { favorites: locale } = this.context;

    return (
      <Box className={classes.container} title={locale.removeButtonTitle} onClick={onRemoveHandler}>
        <Favorite className={classes.svg} />
      </Box>
    );
  };

  renderNotFavorites = () => {
    const { classes, onAddHandler } = this.props;
    const { favorites: locale } = this.context;

    return (
      <Box className={classes.container} title={locale.addButtonTitle} onClick={onAddHandler}>
        <FavoriteBorder className={classes.svg} />
      </Box>
    );
  };

  render() {
    const { isFavorites } = this.props;

    return isFavorites ? this.renderFavorites() : this.renderNotFavorites();
  }
}

Favorites.contextType = LocaleContext;

Favorites.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    svg: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveHandler: PropTypes.func.isRequired,
  onAddHandler: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  isFavorites: PropTypes.bool.isRequired,
  addLoading: PropTypes.bool.isRequired,
  removeLoading: PropTypes.bool.isRequired,
  movieName: PropTypes.string.isRequired,
};

export default withStyles(styles)(withSnackbar(Favorites));
