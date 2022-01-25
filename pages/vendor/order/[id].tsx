import Layout from "components/layout";
import { OrderDetail } from "components/pages/vendor/order";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";

const OrderEdit = (): JSX.Element => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Layout.CMS
      pathList={vendorPath}
      router={router}
      breadcrumbs={[
        { title: "訂單列表", link: "/vendor/order" },
        { title: id === "new" ? "建立訂單" : "編輯訂單", link: "" },
      ]}
    >
      {/* {id === "new" && <div className="text-center w-full ">add</div>}
      {id !== "new" && <div className="text-center w-full ">{id}</div>} */}

      <OrderDetail orderNo={id === "new" ? null : (id as string)} />
    </Layout.CMS>
  );
};

export default OrderEdit;
