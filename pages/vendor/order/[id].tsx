import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";

const OrderEdit = (): JSX.Element => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Layout.CMS pathList={vendorPath} router={router}>
      {id === "new" && <div className="text-center w-full ">add</div>}
      {id !== "new" && <div className="text-center w-full ">{id}</div>}
    </Layout.CMS>
  );
};

export default OrderEdit;
