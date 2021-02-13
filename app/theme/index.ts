import light from './light';

export type Theme = typeof light;
export type ThemeName = 'dark' | 'light';
export type Themes = { [key in ThemeName]: Theme };

export const themes: Themes = {
  light,
};

export default (name: ThemeName): Theme => {
  return themes[name] || light;
};
