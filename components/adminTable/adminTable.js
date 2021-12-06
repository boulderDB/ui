import Link from "next/link";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import { useContext } from "react";
import { AppContext } from "../../pages/_app";
import styles from "./adminTable.module.css";

export default function AdminTable({ data, columns, config }) {
  const { currentLocation } = useContext(AppContext);

  return (
    <div className={styles.root}>
      <div
        className={styles.header}
        style={{
          gridTemplateColumns: `repeat(${columns?.length}, 1fr)`,
        }}
      >
        {columns?.map((item, index) => {
          return (
            <div className={typography.delta700} key={index}>
              {item.property}
            </div>
          );
        })}
      </div>

      {data?.length ? (
        data.map((item, index) => {
          return (
            <Link
              key={index}
              href={`/${currentLocation?.url}/admin/${config.route}/${item.id}`}
            >
              <a
                key={index}
                className={styles.row}
                style={{
                  gridTemplateColumns: `repeat(${columns?.length}, 1fr)`,
                }}
              >
                {columns?.map((column, index) => {
                  const value = item[column.property];

                  return (
                    <div
                      className={cn(styles.cell, typography.delta)}
                      key={index}
                    >
                      <div
                        className={cn(typography.delta700, styles.cellLabel)}
                      >
                        {column.property}:
                      </div>{" "}
                      {column.renderer(value)}
                    </div>
                  );
                })}
              </a>
            </Link>
          );
        })
      ) : (
        <div className={styles.row}>
          <p className={typography.delta}>No data</p>
        </div>
      )}
    </div>
  );
}
