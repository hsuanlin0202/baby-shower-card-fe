module.exports = {
  env: { STRAPI_API: process.env.STRAPI_API },
  publicRuntimeConfig: { STRAPI_API: process.env.STRAPI_API },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
