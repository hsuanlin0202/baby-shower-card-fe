import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";

const Template = (): JSX.Element => {
  const router = useRouter();
  return (
    <Layout.CMS
      pathList={vendorPath}
      router={router}
      breadcrumbs={[{ title: "模板列表", link: "" }]}
    >
      模板列表
    </Layout.CMS>
  );
};

export default Template;
