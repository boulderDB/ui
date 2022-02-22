import Layout from "../../../../../../components/layout/layout";
import { useRouter } from "next/router";
import Meta from "../../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../../styles/utilities";
import React, { useContext, useMemo } from "react";
import cn from "classnames";
import Breadcrumbs from "../../../../../../components/breadcrumbs/breadcrumbs";
import { AppContext } from "../../../../../_app";
import { useCachedHttp, useHttp } from "../../../../../../hooks/useHttp";
import Loader from "../../../../../../components/loader/loader";
import AdminTable from "../../../../../../components/adminTable/adminTable";
import { columns } from "../../../../../../components/boulderTable/boulderTable";
import styles from "../../../index.module.css";
import HoldType from "../../../../../../components/holdType/holdType";
import Grade from "../../../../../../components/grade/grade";
import Button from "../../../../../../components/button/button";
import mutateApi from "../../../../../../utilties/mutateApi";
import toast from "../../../../../../utilties/toast";
import extractErrorMessage from "../../../../../../utilties/extractErrorMessage";

export default function Index() {
  const { query } = useRouter();
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const boulders = useCachedHttp(`/${currentLocation?.url}/boulders`);
  const identifier = useCachedHttp(
    `/${currentLocation?.url}/readable-identifiers/${query.identifier}`
  );

  const http = useHttp();

  const tableColumns = [
    {
      ...columns.name,
      className: styles.nameCell,
    },
    {
      ...columns.holdType,
      Cell: ({ value }) => <HoldType image={value.image} />,
    },
    {
      ...columns.grade,
      Cell: ({ value }) => (
        <Grade
          name={value.name}
          color={value.color}
          internalName={value.internal?.name}
          internalColor={value.internal?.color}
        />
      ),
    },
    {
      ...columns.date,
    },
    {
      accessor: "readableIdentifier.value",
      Header: "Readable identifier",
    },
    {
      id: "id",
      accessor: "id",
      className: styles.link,
      Cell: ({ value }) => (
        <>
          <Button
            onClick={async () => {
              try {
                await http.put(`/${currentLocation.url}/boulders/${value}`, {
                  readableIdentifier: identifier.id,
                });

                mutateApi(`/${currentLocation?.url}/boulders`);
              } catch (error) {
                dispatchMessage(
                  toast("Error", extractErrorMessage(error), "error")
                );
              }
            }}
            inverted={true}
            size={"s"}
          >
            Assign
          </Button>{" "}
        </>
      ),
    },
  ];

  if (!boulders || !identifier) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`Admin / Boulders / Assign / ${query.identifier}`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          <Breadcrumbs
            items={[
              {
                title: "Admin",
                href: `/${currentLocation?.url}/admin`,
              },
              {
                title: "Boulders",
                href: `/${currentLocation?.url}/admin/boulders`,
              },
              {
                title: `Assign readable identifier '${query.identifier}'`,
              },
            ]}
          />
        </h1>

        <div className={layoutStyles.sideContent}>
          <AdminTable
            data={boulders}
            columns={tableColumns}
            sortProperty={"name"}
          />
        </div>
      </div>
    </Layout>
  );
}
