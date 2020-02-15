import dark from './dark';
import light from './light';

export type Theme = typeof dark;
export type ThemeName = 'dark' | 'light';
export type Themes = { [key in ThemeName]: Theme };

export const themes: Themes = {
  dark,
  light,
};

export default (name: ThemeName): Theme => {
  return themes[name] || dark;
};
