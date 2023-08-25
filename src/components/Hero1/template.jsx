import React from "react";

export const HeroBlockTemplate1 = {
  name: "hero1",
  label: "Hero1",
  fields: [
    {
      name: "title",
      label: "Title",
      description: "By default this is the site title",
      type: "string",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      description: "By default this is the site tagline",
      type: "string",
    },
    {
      label: "Document Link",
      name: "document",
      type: "reference",
      collections: ["doc"],
    },
    {
      name: "documentLabel",
      label: "Button Text",
      type: "string",
    },
  ],
};
