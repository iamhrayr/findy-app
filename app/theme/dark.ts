import colors from './colors';
// import base from './base';

export default {
  container: {
    padding: 15,
  },
  colors: {
    primary: colors.blue,
    secondary: colors.orange,
    danger: colors.red,
    success: colors.green,
    headerBg: '',
    appBg: colors.darkGray,
    footerBg: '',
    link: colors.blue,
    white: colors.white,
  },
  fontSizes: { sm: 14, md: 17, lg: 20, h3: 20, h2: 24, h1: 28, giant: 50 },
  borderRadius: {
    square: 0,
    round: 7,
    circle: 50,
  },
  button: {
    fontWeight: 500,
    fontSizes: { sm: 14, md: 17, lg: 20 },
    paddingX: { sm: 18, md: 26, lg: 34 },
    paddingY: { sm: 8, md: 12, lg: 16 },
    spacer: { xs: 5, sm: 10, md: 15, lg: 20, xl: 25 },
  },
  // TODO: base styles should be separated
  // TODO: base styles should be separated
};
