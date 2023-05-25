import { fetcher } from "../../lib/http";
import useSWR from "swr";
import { Boulder } from "../../lib/types";
import styles from "./details.module.css";
import { parseDate } from "../../lib/parseDate";
import { cx } from "classix";
import utilities from "../../styles/utilities/utilities";
import { Icon } from "../icon/icon";
import { Button } from "../button/button";
import { Loader } from "../loader/loader";
import { User } from "../user/user";
import { useAppContext } from "../../pages/_app";
import { ascentColors } from "../ascent/ascent";

type DetailsProps = {
  id: number;
};

export function Details({ id }: DetailsProps) {
  const { currentLocation } = useAppContext();

  const { data } = useSWR<Boulder>(
    `/api/${currentLocation?.url}/boulders/${id}`,
    fetcher
  );

  if (!data) {
    return <Loader />;
  }

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <h3 className={cx(utilities.typograpy.gamma700)}>
          Did you like the boulder?
          <div className={styles.rateButtons}>
            <button className={utilities.typograpy.gamma700}>👍</button>
            <button className={utilities.typograpy.gamma700}>👎</button>
          </div>
        </h3>
      </section>

      <section className={styles.section}>
        <h3 className={cx(utilities.typograpy.gamma700)}>Tags</h3>

        <ul className={styles.tagList}>
          {data.tags.map((tag) => (
            <li>
              <span className={utilities.typograpy.delta}>
                {tag.emoji} {tag.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={cx(utilities.typograpy.gamma700)}>
          Ascents ({data.ascents.length})
        </h3>

        <ol className={styles.ascentList}>
          {data.ascents.map((ascent) => (
            <li className={styles.ascentListItem}>
              <User image={ascent.user.image} username={ascent.user.username} />

              <span className={utilities.typograpy.delta}>
                <Icon
                  name={ascent.type}
                  style={{ color: ascentColors[ascent.type] }}
                />{" "}
                ({ascent.type})
              </span>

              <span
                className={cx(
                  utilities.typograpy.delta,
                  styles.ascentCreatedAt
                )}
              >
                {parseDate(ascent.createdAt)}
              </span>

              {/* <Button size={"small"} display={"inline"} outlined={true}>
                Doubt it
              </Button> */}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h3 className={cx(utilities.typograpy.gamma700)}>
          Comments ({data.comments.length})
        </h3>

        <ul className={styles.commentList}>
          {data.comments.map((comment) => (
            <li>
              <User
                image={comment.author.image}
                username={comment.author.username}
              />

              <p className={utilities.typograpy.delta}>{comment.message}</p>
            </li>
          ))}
        </ul>

        {/* <Button className={styles.addCommentButton}>Leave a comment</Button> */}
      </section>

      {/* <section className={styles.section}>
        <Button variant={"danger"}>Report error</Button>
      </section> */}
    </div>
  );
}
