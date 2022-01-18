import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";
import Form from "components/elements/form";



const Information = (): JSX.Element => {
  const router = useRouter();
  return (
    <Layout.CMS
      name="波特鬆餅"
      role="廠商"
      pathList={vendorPath}
      router={router}
    >
      廠商資料維護
      <form>

      </form>
    </Layout.CMS>
  );
};

export default Information;
