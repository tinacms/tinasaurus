import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
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
            templates: [
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
            ],
          },
        ],
      },
    ],
  },
});
