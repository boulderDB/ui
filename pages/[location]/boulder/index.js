import Layout from "../../../components/layout/layout";
import withAuthentication from "../../../utilties/withAuthentication";
import Meta from "../../../components/meta/meta";

export default function Index({ boulder }) {
  return (
    <Layout>
      <Meta title={"Boulders"} />
      <h1>Boulder</h1>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return withAuthentication(context, async (http, location) => {
    const { data: boulder } = await http.get(`/${location}/boulders`);

    return {
      props: {
        boulder,
      },
    };
  });
}
