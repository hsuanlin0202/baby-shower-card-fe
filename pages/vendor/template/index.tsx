import Layout from "components/layout";
import { TemplateList } from "components/pages/vendor";
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
      <TemplateList router={router} />
    </Layout.CMS>
  );
};

export default Template;
