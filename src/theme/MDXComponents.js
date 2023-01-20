import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import CodeBlock from "@theme-original/CodeBlock";
import Details from "@theme-original/MDXComponents/Details";
import Img from "@theme-original/MDXComponents/Img";
import Tabs from "@theme-original/Tabs";
import TabItem from "@theme-original/TabItem";

export default {
  ...MDXComponents,
  Image: Img,
  Details: Details,
  CodeBlock: CodeBlock,
  Tabs: Tabs,
  TabItem: TabItem,
  Admonition: MDXComponents.admonition,
};
