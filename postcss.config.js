module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-normalize": {},
    "postcss-nested": {},
    "postcss-extend-rule": {},
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      importFrom: ["./styles/globals/variables.css"],
      stage: 1,
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            exportTo: ["./styles/cssExports.js"],
          }),
    },
  },
};
