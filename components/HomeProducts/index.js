import React from "react";

import styles from "./products.module.scss";

export default function Products({ reverse, children }) {
  if (children.length > 12) return null;

  return (
    <div
      className={styles.container}
      style={{ direction: reverse ? "rtl" : "" }}
    >
      <div>{children[0]}</div>
      
    </div>
  );
}
