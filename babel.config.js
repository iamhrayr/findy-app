module.exports = {
  presets: ['@typescript-eslint/parser'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@app': './app',
        },
      },
    ],
  ],
};
