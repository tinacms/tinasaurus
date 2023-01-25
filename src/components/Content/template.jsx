import React from "react";
import { MDXTemplates } from "../../theme/template";

export const ContentBlockTemplate = {
  name: "content",
  label: "Content",
  fields: [
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [...MDXTemplates],
    },
  ],
};
