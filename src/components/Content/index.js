import React from "react";
import clsx from "clsx";
import MDXContent from "@theme/MDXContent";
import styles from "./styles.module.css";

export const Content = ({ data, index }) => {
  const { content: MDXPageContent } = data;

  return (
    <div key={index} className="container container--fluid margin-vert--lg">
      <div className={clsx("row", styles.mdxPageWrapper)}>
        <div className={clsx("col")}>
          <article>
            <MDXContent>
              <MDXPageContent />
            </MDXContent>
          </article>
        </div>
      </div>
    </div>
  );
};
