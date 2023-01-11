import React from "react";
import MDXComponents from "@theme-original/MDXComponents";

const ParsedDetails = (props) => {
  return (
    <MDXComponents.details>
      <summary>{props.summary}</summary>

      {props.children}
    </MDXComponents.details>
  );
};

export default {
  ...MDXComponents,
  TinaDetails: ParsedDetails,
  Admonition: MDXComponents.admonition,
};
