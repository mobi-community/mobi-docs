const isProd = process.env.NODE_ENV === "production";

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  assetPrefix: isProd ? "https://mobi-docs.github.io/mobi-docs/" : "",
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "",
  },
});
