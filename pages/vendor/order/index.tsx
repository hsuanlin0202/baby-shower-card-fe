import Layout from "components/layout";
import { VendorOrderPage } from "components/pages/vendor/order";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";

const Order = (): JSX.Element => {
  const router = useRouter();
  return (
    <Layout.CMS
      pathList={vendorPath}
      router={router}
      breadcrumbs={[{ title: "訂單列表", link: "" }]}
    >
      <VendorOrderPage router={router} />
    </Layout.CMS>
  );
};

export default Order;
