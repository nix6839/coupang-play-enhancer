const hwyConfig = require('@nix6839/prettier-config');

/** @satisfies {import('prettier').Config} */
const config = {
  ...hwyConfig,
};

module.exports = config;
