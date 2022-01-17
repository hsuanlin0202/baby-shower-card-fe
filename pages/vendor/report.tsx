import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";

const Report = (): JSX.Element => {
  const router = useRouter();
  return (
    <Layout.CMS
      name="波特鬆餅"
      role="廠商"
      pathList={vendorPath}
      router={router}
    >
      問題回報
    </Layout.CMS>
  );
};

export default Report;
