import { ThemeManager, Typography, Colors } from 'react-native-ui-lib';
import colors from './colors';

ThemeManager.setComponentTheme('View', {
  'bg-white': true,
});

ThemeManager.setComponentTheme('Text', {
  text80L: true,
});

Colors.loadColors({
  primary: colors.blue,
  secondary: colors.orange,
  ...colors,
});

// Typography.loadTypographies({
//   h1: { fontSize: 58, fontWeight: '300', lineHeight: 80 },
//   h2: { fontSize: 46, fontWeight: '300', lineHeight: 64 },
// });
