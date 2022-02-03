import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";
import {
  PartnerDetail,
  PartnerView,
} from "components/pages/vendor/information";
import { useState } from "react";

const Information = (): JSX.Element => {
  const router = useRouter();

  const [mode, setMode] = useState<string>("view");

  return (
    <Layout.CMS
      pathList={vendorPath}
      router={router}
      breadcrumbs={[{ title: "廠商資料維護", link: "" }]}
    >
      {mode === "view" ? (
        <>
          <PartnerView updateMode={setMode} mode={mode} />
        </>
      ) : (
        <PartnerDetail updateMode={setMode} mode={mode} />
      )}
    </Layout.CMS>
  );
};

export default Information;
