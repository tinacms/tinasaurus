// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const docusaurusData = require("./config/docusaurus/index.json");

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const getDocId = (doc) => {
  return doc
    .replace(/\.mdx?$/, "")
    .split("/")
    .slice(1)
    .join("/");
};

const navbarItem = (item, subnav = false) => {
  let navItem = {
    label: item.label,
  };

  if (!subnav) {
    navItem.position = item.position;
  }

  if (item.link === "external" && item.externalLink) {
    navItem.href = item.externalLink;
  }

  if (item.link === "blog") {
    navItem.to = "/blog";
  }

  if (item.link === "doc" && item.docLink) {
    navItem.type = "doc";
    navItem.docId = getDocId(item.docLink);
  }

  if (item.items) {
    navItem.type = "dropdown";
    navItem.items = item.items.map((subItem) => {
      return navbarItem(subItem, true);
    });
    console.log(navItem.items);
  }

  return navItem;
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: docusaurusData.title || "My Site",
  tagline: docusaurusData.tagline || "Dinosaurs are cool",
  url: docusaurusData.url || "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // editUrl: "www.google.com"",
        },
        blog: {
          showReadingTime: true,
          // editUrl: "www.google.com"",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: docusaurusData.title || "",
        logo: {
          alt: docusaurusData?.logo?.alt
            ? docusaurusData?.logo?.alt
            : "My Logo",
          src: docusaurusData?.logo?.src
            ? docusaurusData?.logo?.src
            : "img/logo.svg",
        },
        items: docusaurusData.navbar.map((item) => {
          return navbarItem(item);
        }),
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
