import styles from "./breadcrumbs.module.css";
import Link from "next/link";
import { colors } from "../../styles/utilities";
import { Fragment } from "react";

export default function Breadcrumbs({ items }) {
  return (
    <ol className={styles.root}>
      {items.map((item, index) => {
        const isNotLastItem = index + 1 < items.length;

        return (
          <Fragment key={index}>
            <li>
              {isNotLastItem ? (
                <Link href={item.href} className={colors.lila}>
                  {item.title}
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
            </li>
            {isNotLastItem && <li className={styles.separator}>/</li>}
          </Fragment>
        );
      })}
    </ol>
  );
}
