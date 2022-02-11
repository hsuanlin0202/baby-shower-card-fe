import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";
import {
  PartnerDetail,
  PartnerView,
} from "components/pages/vendor/information";
import { useEffect, useState } from "react";
import { VendorInformationTypes } from "types";
import { useInitData } from "hooks";
import { AuthStore } from "store/auth";
import { getPartner } from "api";

const Information = (): JSX.Element => {
  const { openLoader } = useInitData();

  const router = useRouter();

  const [mode, setMode] = useState<"view" | "edit">("view");

  const [information, setInformation] = useState<VendorInformationTypes>();

  const { token, partners } = AuthStore((state) => ({
    token: state.token,
    partners: state.partners,
  }));

  useEffect(() => {
    if (!partners || !!information) return;

    getPartnerInformation();
  }, [partners]);

  const getPartnerInformation = (): void => {
    openLoader(true);

    getPartner(token, partners[0], []).then((res) => {
      openLoader(false);

      setInformation(res);
    });
  };

  return (
    <Layout.CMS
      pathList={vendorPath}
      router={router}
      breadcrumbs={[{ title: "廠商資料維護", link: "" }]}
    >
      {mode === "view" && (
        <PartnerView information={information} updateMode={setMode} />
      )}

      {mode === "edit" && (
        <PartnerDetail
          information={information}
          updateMode={setMode}
          updateDate={() => getPartnerInformation()}
        />
      )}
    </Layout.CMS>
  );
};

export default Information;
