const { imports } = require('./package.json');
const alias = Object.keys(imports).map(item=> [item.replaceAll('/*',''),imports[item].replaceAll('/*','')])

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  // @TODO check node
  // 'plugin:node/recommended',
  // 'plugin:security/recommended'
  extends: ['airbnb-base', 'eslint:recommended','plugin:import/recommended', 'prettier'],
  plugins: ['import','prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs,mjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: alias,
      },
    },
  },
  rules: {
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'node/no-missing-import': 'off'
  },
};
