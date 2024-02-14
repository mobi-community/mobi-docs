import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import MobiDocsLogo from "./public/assets/images/mobi-docs.png";
import Image from "next/image";

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: "bold" }}>
      MOBI <br /> DOCS
    </span>
  ),
  project: {
    link: "https://github.com/mobi-community/mobi-docs",
  },
  // chat: {
  //   link: "https://discord.com",
  // },
  docsRepositoryBase: "https://github.com/mobi-community/mobi-docs",
  footer: {
    text: "MOBI DOCS",
  },
};

export default config;
