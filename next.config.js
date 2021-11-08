module.exports = {
  async rewrites() {
    const entries = [];

    if (process.env.API_PROXY) {
      entries.push({
        source: "/api/:path*",
        destination: `${process.env.API_PROXY}/api/:path*`,
        basePath: false,
      });
    }

    return entries;
  },
};
