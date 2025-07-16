const path = require('path');

module.exports = {
  extends: ['@repo/eslint-config/index.js'],
  parserOptions: {
    project: path.resolve(__dirname, 'tsconfig.json'),
    tsconfigRootDir: __dirname,
  },
};
