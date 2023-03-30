// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const withPWA = require("next-pwa");
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  pwa: {
    dest: "public",
  },
  experimental: {
    appDir: true,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

if (process.env.NODE_ENV === "production") {
  module.exports = withSentryConfig(
    withPWA(moduleExports),
    sentryWebpackPluginOptions
  );
} else {
  module.exports = moduleExports;
}
