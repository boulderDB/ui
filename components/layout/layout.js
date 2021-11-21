import React from "react";
import styles from "./layout.module.css";
import Loader from "../loader/loader";

function Layout({ loading = false, children }) {
  return (
    <>
      <main className={styles.main}>{loading ? <Loader /> : children}</main>
    </>
  );
}

export default Layout;
