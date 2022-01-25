import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";

const Report = (): JSX.Element => {
  const router = useRouter();
  return (
    <Layout.CMS
      pathList={vendorPath}
      router={router}
      breadcrumbs={[{ title: "問題回報", link: "" }]}
    >
      問題回報
    </Layout.CMS>
  );
};

export default Report;
