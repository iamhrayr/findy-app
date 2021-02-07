import palette from './palette';
import base from './base';
import components from './components';

export default {
  colors: {
    primary: palette.blue600,
    secondary: palette.orange600,
    danger: palette.red600,
    success: palette.green600,
    appBg: palette.white,
    link: palette.blue400,
    gray: palette.gray500,
    ...palette,
  },
  ...base,
  ...components,
};
