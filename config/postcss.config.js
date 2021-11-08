module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {
      stage: 1,
      importFrom: ["./styles/globals/variables.css"],
      exportTo: ["./styles/cssExports.js"],
    },
  },
};
