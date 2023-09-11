// .tina/config.jsx
import React4 from "react";
import { defineConfig, TextField } from "tinacms";
import { ReferenceField } from "tinacms";

// src/components/Features/template.jsx
import React from "react";
var FeaturesBlockTemplate = {
  name: "features",
  label: "Features",
  fields: [
    {
      name: "items",
      label: "Features",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.title
        })
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string"
        },
        {
          name: "description",
          label: "Description",
          type: "rich-text"
        },
        {
          name: "image",
          label: "Image",
          type: "image"
        }
      ]
    }
  ]
};

// src/components/Hero/template.jsx
import React2 from "react";
var HeroBlockTemplate = {
  name: "hero",
  label: "Hero",
  fields: [
    {
      name: "title",
      label: "Title",
      description: "By default this is the site title",
      type: "string"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      description: "By default this is the site tagline",
      type: "string"
    },
    {
      label: "Document Link",
      name: "document",
      type: "reference",
      collections: ["doc"]
    },
    {
      name: "documentLabel",
      label: "Button Text",
      type: "string"
    }
  ]
};

// src/theme/template.jsx
import React3 from "react";

// util.js
import title from "title";
var slugify = (text) => {
  return text.toString().toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "_").replace(/^-+|-+$/g, "");
};
var docusaurusDate = (val) => {
  let ye = new Intl.DateTimeFormat("en", {
    year: "numeric"
  }).format(val);
  let mo = new Intl.DateTimeFormat("en", {
    month: "2-digit"
  }).format(val);
  let da = new Intl.DateTimeFormat("en", {
    day: "2-digit"
  }).format(val);
  return `${ye}-${mo}-${da}`;
};
var titleFromSlug = (slug) => {
  const titleString = slug.split("/").slice(1).join(" \u2013 ").replace(/-/g, " ").replace(/\.[^/.]+$/, "");
  return title(titleString);
};

// src/theme/template.jsx
var AdmonitionTemplate = {
  name: "Admonition",
  ui: {
    defaultItem: {
      type: "note",
      title: "Note"
    },
    itemProps: (item) => {
      return { label: item?.title };
    }
  },
  fields: [
    {
      name: "type",
      label: "Type",
      type: "string",
      options: [
        {
          label: "Note",
          value: "note"
        },
        {
          label: "Tip",
          value: "tip"
        },
        {
          label: "Info",
          value: "info"
        },
        {
          label: "Caution",
          value: "caution"
        },
        {
          label: "Danger",
          value: "danger"
        }
      ]
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true
    },
    {
      name: "children",
      label: "Content",
      type: "rich-text"
    }
  ]
};
var DetailsTemplate = {
  name: "Details",
  fields: [
    {
      name: "summary",
      label: "Summary",
      type: "string",
      isTitle: true,
      required: true
    },
    {
      name: "children",
      label: "Details",
      type: "rich-text"
    }
  ]
};
var CodeBlockTemplate = {
  name: "CodeBlock",
  label: "Code Block",
  fields: [
    {
      name: "title",
      label: "Filename",
      type: "string"
    },
    {
      name: "language",
      label: "Language",
      type: "string"
    },
    {
      name: "children",
      label: "Code",
      type: "rich-text",
      required: true
    }
  ]
};
var TabsTemplate = {
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
          ui: {
            defaultItem: {
              label: "Tab",
              value: "tab"
            }
          },
          fields: [
            {
              name: "label",
              label: "Label",
              type: "string",
              isTitle: true,
              required: true
            },
            {
              name: "value",
              type: "string",
              ui: {
                component: ({ input, tinaForm }) => {
                  React3.useEffect(() => {
                    input.onChange(slugify(tinaForm.values.label));
                  }, [JSON.stringify(tinaForm.values)]);
                  return React3.createElement(
                    "input",
                    {
                      type: "text",
                      id: input.name,
                      className: "hidden",
                      ...input
                    }
                  );
                }
              }
            },
            {
              name: "children",
              label: "Content",
              type: "string",
              ui: {
                component: "textarea"
              }
            }
          ]
        }
      ]
    }
  ]
};
var DocCardListTemplate = {
  name: "DocCardList",
  label: "Doc Card List",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string"
    }
  ]
};
var MDXTemplates = [
  AdmonitionTemplate,
  DetailsTemplate,
  CodeBlockTemplate,
  TabsTemplate,
  DocCardListTemplate
];

// .tina/config.jsx
import title2 from "title";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var WarningIcon = (props) => {
  return React4.createElement(
    "svg",
    {
      stroke: "currentColor",
      fill: "currentColor",
      "stroke-width": "0",
      viewBox: "0 0 24 24",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      ...props
    },
    React4.createElement("path", { d: "M11.001 10h2v5h-2zM11 16h2v2h-2z" }),
    React4.createElement("path", { d: "M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z" })
  );
};
var RestartWarning = () => {
  return React4.createElement("p", { className: "rounded-lg border shadow px-4 py-2.5 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 mb-4" }, React4.createElement("div", { className: "flex items-center gap-2" }, React4.createElement(WarningIcon, { className: `w-6 h-auto flex-shrink-0 text-yellow-400` }), React4.createElement("div", { className: `flex-1 text-sm text-yellow-700 whitespace-normal	` }, "To see settings changes reflected on your site, restart the Tina CLI after saving ", React4.createElement("em", null, "(local development only)"), ".")));
};
var PostCollection = {
  name: "post",
  label: "Posts",
  path: "blog",
  format: "mdx",
  ui: {
    defaultItem: {
      date: docusaurusDate(/* @__PURE__ */ new Date())
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      name: "authors",
      label: "Authors",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        }
      },
      fields: [
        {
          name: "name",
          label: "Name",
          type: "string",
          isTitle: true,
          required: true
        },
        {
          name: "title",
          label: "Title",
          type: "string"
        },
        {
          name: "url",
          label: "URL",
          type: "string"
        },
        {
          name: "image_url",
          label: "Image URL",
          type: "string"
        }
      ]
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
          return docusaurusDate(val);
        }
      }
    },
    {
      label: "Tags",
      name: "tags",
      type: "string",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [...MDXTemplates]
    }
  ]
};
var DocsCollection = {
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
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Description"
    },
    {
      label: "Tags",
      name: "tags",
      type: "string",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [...MDXTemplates]
    }
  ]
};
var DocLinkTemplate = {
  name: "doc",
  label: "Doc Link",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.label ? item?.label : item?.document ? titleFromSlug(item?.document) : item.name
      };
    }
  },
  fields: [
    {
      label: "Document",
      name: "document",
      type: "reference",
      collections: ["doc"],
      isTitle: true,
      required: true
    },
    {
      name: "label",
      label: "Label",
      description: "By default this is the document title",
      type: "string"
    }
  ]
};
var ExternalLinkTemplate = {
  name: "link",
  label: "External Link",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.title ? item?.title : item.name
      };
    }
  },
  fields: [
    {
      name: "title",
      label: "Label",
      type: "string",
      isTitle: true,
      required: true
    },
    {
      name: "href",
      label: "URL",
      type: "string",
      required: true
    }
  ]
};
var CategoryFields = [
  {
    name: "title",
    label: "Title",
    type: "string",
    isTitle: true,
    required: true
  },
  {
    name: "link",
    label: "Link",
    type: "string",
    options: [
      {
        label: "None",
        value: "none"
      },
      {
        label: "Document",
        value: "doc"
      },
      {
        label: "Generated Index",
        value: "generated"
      }
    ]
  },
  {
    name: "docLink",
    label: "Document",
    type: "reference",
    collections: ["doc"],
    ui: {
      component: (props) => {
        const link = React4.useMemo(() => {
          let fieldName = props.field.name;
          fieldName = fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;
          return fieldName.split(".").reduce((o, i) => o[i], props.tinaForm.values).link;
        }, [props.tinaForm.values]);
        if (link !== "doc") {
          return null;
        }
        return ReferenceField(props);
      }
    }
  }
];
var ItemsField = {
  name: "items",
  label: "Items",
  type: "object",
  list: true
};
var CategoryTemplateProps = {
  name: "category",
  label: "Category",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.title ? item?.title : item.name
      };
    },
    defaultItem: {
      link: "none"
    }
  }
};
var CategoryTemplate = {
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
                      templates: [DocLinkTemplate, ExternalLinkTemplate]
                    }
                  ]
                },
                DocLinkTemplate,
                ExternalLinkTemplate
              ]
            }
          ]
        },
        DocLinkTemplate,
        ExternalLinkTemplate
      ]
    }
  ]
};
var SidebarItemsField = {
  ...ItemsField,
  templates: [CategoryTemplate, DocLinkTemplate, ExternalLinkTemplate]
};
var SidebarCollection = {
  name: "sidebar",
  label: "Docs Sidebar",
  path: "config/sidebar",
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      type: "string",
      name: "_warning",
      ui: {
        component: () => {
          return React4.createElement(RestartWarning, null);
        }
      }
    },
    {
      type: "string",
      label: "Label",
      name: "label",
      required: true,
      isTitle: true,
      ui: {
        component: "hidden"
      }
    },
    SidebarItemsField
  ]
};
var NavbarItemFields = [
  {
    name: "label",
    label: "Label",
    type: "string",
    isTitle: true,
    required: true
  },
  {
    name: "link",
    label: "Link",
    type: "string",
    options: [
      {
        label: "None",
        value: "none"
      },
      {
        label: "Document",
        value: "doc"
      },
      {
        label: "Page",
        value: "page"
      },
      {
        label: "Blog",
        value: "blog"
      },
      {
        label: "External",
        value: "external"
      }
    ]
  },
  {
    name: "docLink",
    label: "Document",
    type: "reference",
    collections: ["doc"],
    ui: {
      component: (props) => {
        const link = React4.useMemo(() => {
          let fieldName = props.field.name;
          fieldName = fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;
          return fieldName.split(".").reduce((o, i) => o[i], props.tinaForm.values).link;
        }, [props.tinaForm.values]);
        if (link !== "doc") {
          return null;
        }
        return ReferenceField(props);
      }
    }
  },
  {
    name: "pageLink",
    label: "Page",
    type: "reference",
    collections: ["pages"],
    ui: {
      component: (props) => {
        const link = React4.useMemo(() => {
          let fieldName = props.field.name;
          fieldName = fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;
          return fieldName.split(".").reduce((o, i) => o[i], props.tinaForm.values).link;
        }, [props.tinaForm.values]);
        if (link !== "page") {
          return null;
        }
        return ReferenceField(props);
      }
    }
  },
  {
    name: "externalLink",
    label: "URL",
    type: "string",
    ui: {
      component: (props) => {
        const link = React4.useMemo(() => {
          let fieldName = props.field.name;
          fieldName = fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;
          return fieldName.split(".").reduce((o, i) => o[i], props.tinaForm.values).link;
        }, [props.tinaForm.values]);
        if (link !== "external") {
          return null;
        }
        return TextField(props);
      }
    }
  },
  {
    name: "position",
    label: "Position",
    type: "string",
    required: true,
    options: [
      {
        label: "Left",
        value: "left"
      },
      {
        label: "Right",
        value: "right"
      }
    ],
    ui: {
      component: "button-toggle"
    }
  }
];
var NavbarSubitemProps = {
  name: "items",
  label: "Items",
  type: "object",
  list: true,
  ui: {
    itemProps: (item) => ({
      label: item.label
    })
  }
};
var SettingsCollection = {
  label: "Settings",
  name: "settings",
  path: "config/docusaurus",
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      type: "string",
      name: "_warning",
      ui: {
        component: () => {
          return React4.createElement(RestartWarning, null);
        }
      }
    },
    {
      type: "string",
      label: "Label",
      name: "label",
      required: true,
      isTitle: true,
      ui: {
        component: "hidden"
      }
    },
    {
      type: "object",
      label: "Logo",
      name: "logo",
      fields: [
        {
          type: "string",
          label: "Alt Text",
          name: "alt"
        },
        {
          type: "image",
          label: "Source",
          name: "src"
        }
      ]
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "URL",
      name: "url",
      required: true
    },
    {
      type: "object",
      label: "Navbar",
      name: "navbar",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.label + " - " + title2(item.position)
        }),
        defaultItem: {
          position: "left"
        }
      },
      fields: [
        ...NavbarItemFields,
        {
          ...NavbarSubitemProps,
          fields: [
            ...NavbarItemFields,
            {
              ...NavbarSubitemProps,
              fields: NavbarItemFields
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          name: "style",
          label: "Style",
          type: "string",
          options: [
            {
              label: "Dark",
              value: "dark"
            },
            {
              label: "Light",
              value: "light"
            }
          ],
          ui: {
            component: "button-toggle"
          }
        },
        {
          type: "object",
          label: "Categories",
          name: "links",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.title
            })
          },
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title"
            },
            {
              type: "object",
              label: "Links",
              name: "items",
              list: true,
              templates: [
                {
                  name: "internal",
                  label: "Internal",
                  ui: {
                    itemProps: (item) => ({
                      label: item.label
                    })
                  },
                  fields: [
                    {
                      type: "string",
                      label: "Label",
                      name: "label"
                    },
                    {
                      type: "reference",
                      label: "Page",
                      name: "to",
                      collections: ["doc", "pages", "post"]
                    }
                  ]
                },
                {
                  name: "blog",
                  label: "Blog",
                  ui: {
                    defaultItem: {
                      label: "Blog"
                    },
                    itemProps: (item) => ({
                      label: item.label
                    })
                  },
                  fields: [
                    {
                      type: "string",
                      label: "Label",
                      name: "label"
                    }
                  ]
                },
                {
                  name: "external",
                  label: "External",
                  ui: {
                    itemProps: (item) => ({
                      label: item.label
                    })
                  },
                  fields: [
                    {
                      type: "string",
                      label: "Label",
                      name: "label"
                    },
                    {
                      type: "string",
                      label: "URL",
                      name: "href"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "string",
          label: "Copyright",
          name: "copyright"
        }
      ]
    }
  ]
};
var HomepageCollection = {
  name: "homepage",
  label: "Homepage",
  description: "To see settings changes reflected on your site, you must restart the Tina CLI after saving changes (local development only).",
  path: "config/homepage",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      type: "string",
      name: "_warning",
      ui: {
        component: () => {
          return React4.createElement(RestartWarning, null);
        }
      }
    },
    {
      type: "string",
      label: "Label",
      name: "label",
      required: true,
      isTitle: true,
      ui: {
        component: "hidden"
      }
    },
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "string",
      name: "description",
      label: "Description"
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Blocks",
      templates: [HeroBlockTemplate, FeaturesBlockTemplate]
    }
  ]
};
var PagesCollection = {
  name: "pages",
  label: "Pages",
  path: "src/pages",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Description"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [...MDXTemplates]
    }
  ]
};
var config_default = defineConfig({
  branch,
  clientId: "ec80bfa2-69ad-4167-af8a-964c9609c8bf",
  // Get this from tina.io
  token: "dd362ccf58b166176f0b818999c405cd90b8d1fb",
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "static"
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "static"
    }
  },
  schema: {
    collections: [
      DocsCollection,
      PostCollection,
      HomepageCollection,
      PagesCollection,
      SidebarCollection,
      SettingsCollection
    ]
  }
});
export {
  config_default as default
};
