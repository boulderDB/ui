// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  async rewrites() {
    const entries = [];

    if (process.env.NEXT_PUBLIC_API_PROXY) {
      entries.push({
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_PROXY}/api/:path*`,
        basePath: false,
      });
    }

    return entries;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
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
  module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
} else {
  module.exports = moduleExports;
}
