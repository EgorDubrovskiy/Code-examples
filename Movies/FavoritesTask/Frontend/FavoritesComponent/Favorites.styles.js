import red from '@material-ui/core/colors/red';

const containerSize = 40;

const styles = () => ({
  container: {
    width: containerSize,
    height: containerSize,
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
    },
    transition: '.25s',
  },
  svg: {
    width: '100%',
    height: '100%',
    fill: red[800],
  },
});

export default styles;
