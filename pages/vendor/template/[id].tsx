import Layout from "components/layout";
import { TemplateDetail } from "components/pages/vendor";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";
type Props = {};

const TemplateEdit = ({}: Props): JSX.Element => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <Layout.CMS
      pathList={vendorPath}
      router={router}
      breadcrumbs={[
        { title: "模板列表", link: "/vendor/template" },
        { title: id === "new" ? "新增模板" : "編輯模板", link: "" },
      ]}
    >
      <TemplateDetail
        id={id === "new" ? null : (id as string)}
        router={router}
      />
    </Layout.CMS>
  );
};

export default TemplateEdit;
