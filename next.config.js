const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  assetPrefix: '/',
  basePath: assetPrefix,
  // output: "export",
};

module.exports = {
  ...withNextra(),
  ...nextConfig,
};
