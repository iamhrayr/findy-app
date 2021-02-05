import { s } from 'react-native-size-matters';

import colors from './colors';
import palette from './palette';

export default {
  colors: {
    primary: palette.blue600,
    secondary: palette.orange600,
    danger: palette.red600,
    success: palette.green600,
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
    padding: s(15),
    paddingExtra: s(35),
    bgColor: colors.white,
  },
  text: {
    color: colors.dirtyBlue,
    fontSizes: {
      xs: s(11),
      sm: s(14),
      md: s(17),
      lg: s(20),
      h3: s(24),
      h2: s(28),
      h1: s(32),
      giant: s(50),
    },
  },
  borderRadius: {
    square: 0,
    round: s(7),
    circle: s(50),
  },
  spacer: {
    xs: s(5),
    sm: s(10),
    md: s(15),
    lg: s(25),
    xl: s(40),
    xxl: s(50),
    huge: s(70),
  },
  button: {
    fontWeight: 500,
    fontSizes: { sm: s(14), md: s(17), lg: s(20) },
    paddingX: { sm: s(18), md: s(26), lg: s(34) },
    paddingY: { sm: s(8), md: s(12), lg: s(16) },
  },
  form: {
    label: {
      color: colors.darkGray,
      opacity: 0.5,
    },
    border: {
      color: colors.gray,
      width: s(1),
    },
    error: {
      fontSize: s(14),
    },
  },
};
