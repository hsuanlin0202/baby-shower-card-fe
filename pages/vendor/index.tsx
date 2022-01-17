import Layout from "components/layout";
import { useRouter } from "next/router";
import { vendorPath } from "constant/router";

const VendorIndexPage = (): JSX.Element => {
  const router = useRouter();
  return (
    <Layout.CMS
      name="波特鬆餅"
      role="廠商"
      pathList={vendorPath}
      router={router}
    >
      order
    </Layout.CMS>
  );
};
export default VendorIndexPage;
