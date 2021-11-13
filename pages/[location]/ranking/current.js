import Layout from "../../../components/layout/layout";
import { useHttp } from "../../../hooks/useRequest";

export default function Current() {
  const http = useHttp();

  return (
    <Layout>
      <h1>Current</h1>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
