/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{json,md}": "prettier --write",
  "*.{ts,tsx,js}": ["eslint --fix", "prettier --write", "tsc --noEmit"],
  "*.css": ["eslint --fix", "prettier --write"],
};
