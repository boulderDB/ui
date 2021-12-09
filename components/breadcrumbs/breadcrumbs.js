import styles from "./breadcrumbs.module.css";
import Link from "next/link";
import { colors } from "../../styles/utilities";

export default function Breadcrumbs({ items }) {
  return (
    <ol className={styles.root}>
      {items.map((item, index) => {
        const isNotLastItem = index + 1 < items.length;

        return (
          <>
            <li key={index}>
              {isNotLastItem ? (
                <Link href={item.href}>
                  <a className={colors.lila}>{item.title}</a>
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
            </li>
            {isNotLastItem && <li className={styles.separator}>/</li>}
          </>
        );
      })}
    </ol>
  );
}
