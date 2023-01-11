import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const MDXTemplates = [
  {
    name: "Admonition",
    fields: [
      {
        name: "type",
        label: "Type",
        type: "string",
        options: [
          {
            label: "Note",
            value: "note",
          },
          {
            label: "Tip",
            value: "tip",
          },
          {
            label: "Info",
            value: "info",
          },
          {
            label: "Caution",
            value: "caution",
          },
          {
            label: "Danger",
            value: "danger",
          },
        ],
      },
      {
        name: "title",
        label: "Title",
        type: "string",
      },
      {
        name: "children",
        label: "Content",
        type: "rich-text",
      },
    ],
  },
  {
    name: "TinaDetails",
    label: "Details",
    fields: [
      {
        name: "summary",
        label: "Summary",
        type: "string",
        isTitle: true,
        required: true,
      },
      {
        name: "children",
        label: "Details",
        type: "rich-text",
      },
    ],
  },
];

export default defineConfig({
  branch,
  clientId: "ec80bfa2-69ad-4167-af8a-964c9609c8bf", // Get this from tina.io
  token: "dd362ccf58b166176f0b818999c405cd90b8d1fb", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [...MDXTemplates],
          },
        ],
      },
      {
        name: "doc",
        label: "Docs",
        path: "docs",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [...MDXTemplates],
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            description:
              "The order in which this doc will appear in the sidebar",
          },
        ],
      },
      {
        label: "Global",
        name: "global",
        path: "config",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
          },
          {
            type: "string",
            label: "Tagline",
            name: "tagline",
          },
          {
            type: "string",
            label: "URL",
            name: "url",
          },
          {
            type: "object",
            label: "Navbar",
            name: "navbar",
            fields: [
              {
                type: "object",
                label: "Logo",
                name: "logo",
                fields: [
                  {
                    type: "string",
                    label: "Alt Text",
                    name: "alt",
                  },
                  {
                    type: "string",
                    label: "Source",
                    name: "src",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
