import React from "react";
import { defineConfig } from "tinacms";
import { ReferenceField } from "tinacms";
import title from "title";

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, "_") // swap any length of whitespace, underscore, hyphen characters with a single _
    .replace(/^-+|-+$/g, ""); // remove leading, trailing -
};

const docusaurusDate = (val) => {
  let ye = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(val);
  let mo = new Intl.DateTimeFormat("en", {
    month: "2-digit",
  }).format(val);
  let da = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(val);
  return `${ye}-${mo}-${da}`;
};

const titleFromSlug = (slug) => {
  const titleString = slug
    .split("/")
    .slice(1)
    .join(" – ")
    .replace(/-/g, " ")
    .replace(/\.[^/.]+$/, "");
  return title(titleString);
};

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const AdmonitionTemplate = {
  name: "Admonition",
  ui: {
    defaultItem: {
      type: "note",
      title: "Note",
    },
    itemProps: (item) => {
      return { label: item?.title };
    },
  },
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
      isTitle: true,
      required: true,
    },
    {
      name: "children",
      label: "Content",
      type: "rich-text",
    },
  ],
};

const ImageTemplate = {
  name: "Image",
  fields: [
    {
      name: "src",
      label: "Image URL",
      type: "string",
      required: true,
    },
    {
      name: "alt",
      label: "Alt Text",
      type: "string",
    },
    {
      name: "title",
      label: "Title",
      type: "string",
    },
  ],
};

const DetailsTemplate = {
  name: "Details",
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
};

const CodeBlockTemplate = {
  name: "CodeBlock",
  label: "Code Block",
  fields: [
    {
      name: "title",
      label: "Filename",
      type: "string",
    },
    {
      name: "language",
      label: "Language",
      type: "string",
    },
    {
      name: "children",
      label: "Code",
      type: "rich-text",
      required: true,
    },
  ],
};

const TabsTemplate = {
  name: "Tabs",
  fields: [
    {
      name: "children",
      label: "Tabs",
      type: "rich-text",
      templates: [
        {
          name: "TabItem",
          label: "Tab",
          fields: [
            {
              name: "label",
              label: "Label",
              type: "string",
              isTitle: true,
              required: true,
            },
            {
              name: "value",
              type: "string",
              ui: {
                component: ({ input, tinaForm }) => {
                  React.useEffect(() => {
                    input.onChange(slugify(tinaForm.values.label));
                  }, [JSON.stringify(tinaForm.values)]);

                  return (
                    <input
                      type="text"
                      id={input.name}
                      className="hidden"
                      {...input}
                    />
                  );
                },
              },
            },
            {
              name: "children",
              label: "Content",
              type: "rich-text",
            },
          ],
        },
      ],
    },
  ],
};

const DocCardListTemplate = {
  name: "DocCardList",
  label: "Doc Card List",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
  ],
};

const MDXTemplates = [
  AdmonitionTemplate,
  ImageTemplate,
  DetailsTemplate,
  CodeBlockTemplate,
  TabsTemplate,
  DocCardListTemplate,
];

const DocLinkTemplate = {
  name: "doc",
  label: "Doc Link",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.label
          ? item?.label
          : item?.document
          ? titleFromSlug(item?.document)
          : item.name,
      };
    },
  },
  fields: [
    {
      label: "Document",
      name: "document",
      type: "reference",
      collections: ["doc"],
      isTitle: true,
      required: true,
    },
    {
      name: "label",
      label: "Label",
      description: "By default this is the document title",
      type: "string",
    },
  ],
};

const ExternalLinkTemplate = {
  name: "link",
  label: "External Link",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.title ? item?.title : item.name,
      };
    },
  },
  fields: [
    {
      name: "title",
      label: "Label",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      name: "href",
      label: "URL",
      type: "string",
      required: true,
    },
  ],
};

const CategoryFields = [
  {
    name: "title",
    label: "Title",
    type: "string",
    isTitle: true,
    required: true,
  },
  {
    name: "link",
    label: "Link",
    type: "string",
    options: [
      {
        label: "None",
        value: "none",
      },
      {
        label: "Document",
        value: "doc",
      },
      {
        label: "Generated Index",
        value: "generated",
      },
    ],
  },
  {
    name: "docLink",
    label: "Document",
    type: "reference",
    collections: ["doc"],
    ui: {
      component: (props) => {
        const link = React.useMemo(() => {
          let fieldName = props.field.name;
          fieldName =
            fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;

          return fieldName
            .split(".")
            .reduce((o, i) => o[i], props.tinaForm.values).link;
        }, [props.tinaForm.values]);

        if (link !== "doc") {
          return null;
        }

        return ReferenceField(props);
      },
    },
  },
];

const ItemsField = {
  name: "items",
  label: "Items",
  type: "object",
  list: true,
};

const CategoryTemplateProps = {
  name: "category",
  label: "Category",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.title ? item?.title : item.name,
      };
    },
    defaultItem: {
      link: "none",
    },
  },
};

const CategoryTemplate = {
  ...CategoryTemplateProps,
  fields: [
    ...CategoryFields,
    {
      ...ItemsField,
      templates: [
        {
          ...CategoryTemplateProps,
          fields: [
            ...CategoryFields,
            {
              ...ItemsField,
              templates: [
                {
                  ...CategoryTemplateProps,
                  fields: [
                    ...CategoryFields,
                    {
                      ...ItemsField,
                      templates: [DocLinkTemplate, ExternalLinkTemplate],
                    },
                  ],
                },
                DocLinkTemplate,
                ExternalLinkTemplate,
              ],
            },
          ],
        },
        DocLinkTemplate,
        ExternalLinkTemplate,
      ],
    },
  ],
};

const SidebarItemsField = {
  ...ItemsField,
  templates: [CategoryTemplate, DocLinkTemplate, ExternalLinkTemplate],
};

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
        ui: {
          defaultItem: {
            date: docusaurusDate(new Date()),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "authors",
            label: "Authors",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name };
              },
            },
            fields: [
              {
                name: "name",
                label: "Name",
                type: "string",
                isTitle: true,
                required: true,
              },
              {
                name: "title",
                label: "Title",
                type: "string",
              },
              {
                name: "url",
                label: "URL",
                type: "string",
              },
              {
                name: "image_url",
                label: "Image URL",
                type: "string",
              },
            ],
          },
          {
            name: "date",
            label: "Date",
            type: "string",
            required: true,
            ui: {
              dateFormat: "MMM D, yyyy",
              component: "date",
              parse: (val) => {
                docusaurusDate(val);
              },
            },
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
        ],
      },
      {
        name: "sidebar",
        label: "Docs Sidebar",
        path: "config/sidebar",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [SidebarItemsField],
      },
      {
        label: "Global",
        name: "global",
        path: "config/docusaurus",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
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
