import { createTheme } from '@shopify/restyle';

const palette = {
  blue: '#368DD8',
  orange: '#D99B39',
  red: '#C94040',
  green: '#5ACC6C',
  gray: '#dcdcdc',
  lightGray: '#e6e4e9',
  darkGray: '#282828',
  dirtyBlue: '#4F5764',
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
};

const theme = createTheme({
  colors: {
    primary: palette.blue,
    secondary: palette.orange,
    mainBackground: palette.white,
    cardPrimaryBackground: palette.white,
    textPrimary: palette.darkGray,
    ...palette,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 60,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },

  cardVariants: {},

  textVariants: {
    tiny: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '500',
    },
    body: {
      fontSize: 16,
      // lineHeight: 24,
      color: 'darkGray',
    },
    subtitle: {
      fontSize: 22,
      lineHeight: 30,
      color: 'blue',
      fontWeight: 'bold',
    },
    title: {
      fontSize: 30,
      lineHeight: 36,
      color: 'blue',
      fontWeight: 'bold',
    },
    giant: {
      fontSize: 30,
      lineHeight: 36,
      color: 'blue',
      fontWeight: 'bold',
    },
  },

  buttonVariants: {
    primary: {
      bg: 'primary',
      color: 'white',
    },
    secondary: {
      bg: 'secondary',
      color: 'white',
    },
  },
  buttonSizes: {
    xs: {
      paddingVertical: 'm',
    },
  },
});

export type Theme = typeof theme;
export default theme;
