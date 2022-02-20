module.exports = {
  env: { STRAPI_API: process.env.STRAPI_API },
  publicRuntimeConfig: { STRAPI_API: process.env.STRAPI_API },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
