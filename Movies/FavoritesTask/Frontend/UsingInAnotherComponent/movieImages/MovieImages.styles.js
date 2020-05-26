const favoritesPadding = 10;

const styles = () => ({
  root: {
    padding: 0,
  },
  slider: {
    height: 513,
  },
  posters: {
    position: 'relative',
  },
  favorites: {
    position: 'absolute',
    bottom: favoritesPadding,
    right: favoritesPadding,
    zIndex: 3,
  },
});

export default styles;
