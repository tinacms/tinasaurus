// @ts-check
const sidebarData = require("./config/sidebar/index.json");

const getDocId = (doc) => {
  return doc
    .replace(/\.mdx?$/, "")
    .split("/")
    .slice(1)
    .join("/");
};

const getItem = (item) => {
  const type = item["_template"];

  let itemProps = {
    type: type,
  };

  if (type === "doc") {
    itemProps.id = getDocId(item.document);
  }

  if (type === "category") {
    if (item.title) {
      itemProps.label = item.title;
    }
    if (item.linked && item.link) {
      itemProps.link = {
        type: "doc",
        id: getDocId(item.link),
      };
    }
    itemProps.items = item.items.map((item) => {
      return getItem(item);
    });
  }

  if (type === "link") {
    itemProps.label = item.title;
    itemProps.href = item.href;
  }

  return itemProps;
};

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: sidebarData.items.map((item) => {
    return getItem(item);
  }),
};

module.exports = sidebars;
