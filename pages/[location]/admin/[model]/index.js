import Meta from "../../../../components/meta/meta";
import Layout from "../../../../components/layout/layout";
import { models } from "../index";
import { layoutStyles, typography } from "../../../../styles/utilities";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../../../_app";
import { useRouter } from "next/router";
import { useCachedHttp } from "../../../../hooks/useHttp";
import AdminTable from "../../../../components/adminTable/adminTable";
import Button from "../../../../components/button/button";
import Loader from "../../../../components/loader/loader";
import Breadcrumbs from "../../../../components/breadcrumbs/breadcrumbs";
import Pagination from "../../../../components/pagination/pagination";
import Link from "next/link";

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const router = useRouter();
  let { model, page } = router.query;

  page = page ? parseInt(page) : 0;

  const config = models.find((item) => item.route === model);

  let api = `/${currentLocation?.url}${config.api}`;
  let parameters = {
    filter: "all",
  };

  if (config.archive) {
    api += `/archive`;

    parameters = {
      page,
    };
  }

  let data = useCachedHttp(api, parameters);

  if (!data) {
    return <Loader />;
  }

  let paginationProps = {};

  if (config.archive) {
    paginationProps = {
      pageIndex: page,
      pages: data.pages,
      pageSize: data.size,
      pageCount: data.pages,
      canPreviousPage: data.hasPreviousPage,
      canNextPage: data.hasNextPage,
      nextPage: () => {
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            page: page + 1,
          },
        });
      },
      previousPage: () => {
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            page: page - 1,
          },
        });
      },
    };

    data = data.items;
  }

  data = data.map((data) => {
    return {
      ...data,
      href: `/${currentLocation.url}/admin${config.api}`,
    };
  });

  return (
    <Layout>
      <Meta title={`Admin / ${config.title}`} />

      <div className={layoutStyles.grid}>
        <div className={cn(layoutStyles.sideTitle)}>
          <h2 className={typography.alpha700}>
            <Breadcrumbs
              items={[
                {
                  title: "Admin",
                  href: `/${currentLocation?.url}/admin`,
                },
                {
                  title: config.title,
                  href: `/${currentLocation?.url}/admin${config.api}`,
                },
              ]}
            />
          </h2>

          <Button
            size={"s"}
            href={`/${currentLocation?.url}/admin${config.api}/create`}
          >
            Create
          </Button>
        </div>

        <div className={layoutStyles.sideContent}>
          <AdminTable columns={config.columns} data={data} />

          {config.archive && <Pagination {...paginationProps} />}
        </div>
      </div>

      <Link href={`/flashh/admin/boulders?page=2`}>page2</Link>
    </Layout>
  );
}
