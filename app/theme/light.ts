import colors from './colors';

export default {
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
    gray: colors.gray,
    lightGray: colors.lightGray,
    darkGray: colors.darkGray,
    dirtyBlue: colors.dirtyBlue,
  },
  // TODO: separate base styles?
  content: {
    padding: 15,
    paddingExtra: 35,
    bgColor: colors.white,
  },
  text: {
    color: colors.dirtyBlue,
    fontSizes: { xs: 11, sm: 14, md: 17, lg: 20, h3: 24, h2: 28, h1: 32, giant: 50 },
  },
  borderRadius: {
    square: 0,
    round: 7,
    circle: 50,
  },
  spacer: { xs: 5, sm: 10, md: 15, lg: 25, xl: 40, xxl: 50, huge: 70 },
  button: {
    fontWeight: 500,
    fontSizes: { sm: 14, md: 17, lg: 20 },
    paddingX: { sm: 18, md: 26, lg: 34 },
    paddingY: { sm: 8, md: 12, lg: 16 },
  },
  form: {
    label: {
      color: colors.darkGray,
      opacity: 0.5,
    },
    border: {
      color: colors.gray,
      width: 1,
    },
    error: {
      fontSize: 14,
    },
  },
};
