module.exports = {
  experimental: {
    outputStandalone: true,
  },
  env: { STRAPI_API: process.env.STRAPI_API },
  publicRuntimeConfig: { STRAPI_API: process.env.STRAPI_API },
};
