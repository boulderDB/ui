import Layout from "../../components/layout/layout";
import { useHttp } from "../../hooks/useRequest";

export default function Index() {
  const http = useHttp();

  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  );
}
