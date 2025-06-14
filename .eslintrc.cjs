module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { tsconfigRootDir: __dirname, project: ['./tsconfig.json'] },
  env: { browser: true, es2022: true, node: true },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['**/dist/**', '**/storybook-static/**'],
};
