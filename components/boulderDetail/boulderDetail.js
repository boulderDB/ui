import { createContext, useContext, useMemo, useState } from "react";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import RateButton from "../boulderTable/rateButton";
import Button from "../button/button";
import { useCachedHttp } from "../../hooks/useHttp";
import { AppContext } from "../../pages/_app";
import HoldType from "../holdType/holdType";
import Header from "./header";
import Section from "./section";
import styles from "./boulderDetail.module.css";
import MessageForm from "./messageForm";
import Loader from "../loader/loader";
import Ascents from "./ascents";
import Comments from "./comments";

export const BoulderDetailContext = createContext(null);

export default function BoulderDetail({ id }) {
  const { currentLocation } = useContext(AppContext);
  const boulder = useCachedHttp(`/${currentLocation?.url}/boulders/${id}`);
  const [page, setPage] = useState("index");

  const [pageData, setPageData] = useState();

  const pages = useMemo(() => {
    return {
      index: () => {
        const userRating = boulder.rating;

        return (
          <>
            <Header title={boulder.name}>
              <HoldType
                name={boulder.holdType.name}
                image={boulder.holdType.image}
                small={true}
              />
            </Header>

            <Section title={`Setters (${boulder.setters.length})`}>
              {boulder.setters.length > 0 && (
                <ul>
                  {boulder.setters.map((setter) => (
                    <li className={styles.listItem} key={setter.id}>
                      {setter.username}
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            {boulder?.tags && (
              <Section title={"Tags"}>
                {boulder.tags.length > 0 && (
                  <ul>
                    {boulder.tags.map((tag) => (
                      <li className={styles.listItem} key={tag.id}>
                        {tag.emoji} {tag.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Section>
            )}

            <Section
              title={`Ascents (${
                boulder.ascents.length > 0 ? boulder.ascents.length : 0
              })`}
            >
              <Ascents ascents={boulder.ascents} />
            </Section>

            <Section title={"Comments"}>
              <Comments boulderId={boulder.id} comments={boulder.comments} />
            </Section>

            <div className={styles.commentButton}>
              <Button
                size={"s"}
                inverted={true}
                onClick={() => setPage("comment")}
              >
                Leave a comment
              </Button>
            </div>

            <div className={styles.rating}>
              <RateButton
                boulderId={id}
                direction={"up"}
                value={userRating}
                disabled={userRating && userRating.rating !== 10}
              />

              <span className={styles.ratingSeparator}>|</span>

              <RateButton
                boulderId={id}
                direction={"down"}
                value={userRating}
                disabled={userRating && userRating.rating !== 0}
              />
            </div>

            <div className={styles.errorButton}>
              <Button
                onClick={() => setPage("error")}
                variant={"danger"}
                inverted={true}
                size={"s"}
              >
                Report error
              </Button>
            </div>
          </>
        );
      },
      doubt: ({ ascent }) => (
        <>
          <Header
            backlink={"index"}
            title={`Doubt ${ascent.user.username}`}
            onBack={() => setPage("index")}
          />

          <div className={styles.content}>
            <MessageForm
              name={`Doubt`}
              payload={{
                ascent: ascent?.id,
              }}
              api={"/ascent-doubts"}
            />
          </div>
        </>
      ),
      error: () => (
        <>
          <Header
            backlink={"index"}
            title={`Report error`}
            onBack={() => setPage("index")}
          />

          <div className={styles.content}>
            <MessageForm
              name={`Message`}
              payload={{
                boulder: boulder?.id,
              }}
              api={"/boulder-errors "}
            />
          </div>
        </>
      ),
      comment: () => (
        <>
          <Header
            backlink={"index"}
            title={`Leave a comment`}
            onBack={() => setPage("index")}
          />

          <div className={styles.content}>
            <MessageForm
              name={`Comment`}
              payload={{
                boulder: boulder?.id,
              }}
              api={"/boulder-comments"}
            />
          </div>
        </>
      ),
    };
  }, [boulder]);

  if (!boulder) {
    return <Loader />;
  }

  return (
    <BoulderDetailContext.Provider
      value={{
        page,
        setPage,
        pageData,
        setPageData,
        boulder,
      }}
    >
      <div className={cn(styles.root, typography.epsilon)}>
        {pages[page](pageData)}
      </div>
    </BoulderDetailContext.Provider>
  );
}
