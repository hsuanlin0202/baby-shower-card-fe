import { getPartner } from "api";
import Layout from "components/layout";
import { familyPath } from "constant/router";
import { useInitData } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthStore } from "store/auth";
import { VendorInformationTypes } from "types";

const CardInformation = (): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const router = useRouter();

  const cardId = router.query.id;

  const [information, setInformation] = useState<VendorInformationTypes>();

  const { partners, token } = AuthStore((state) => ({
    partners: state.partners,
    token: state.token,
  }));

  const partner = partners[0];

  const pagePush = (path: string): void => {
    router.push(path.replaceAll("[id]", cardId as string));
  };

  const errorNotify = (): void =>
    showNotify(
      "open",
      "Oops!",
      "找不到廠商資料，請再試一次。",
      () => {
        showNotify("close");
        router.back();
      },
      true
    );

  useEffect(() => {
    if (!partner) {
      errorNotify();
      return;
    }

    openLoader(true);

    getPartner(token, partners[0].id, []).then((res) => {
      openLoader(false);

      if (!res) {
        errorNotify();
        return;
      }

      setInformation(res);
    });
  }, [partner]);

  return (
    <Layout.Family
      title=""
      pathList={familyPath}
      router={router}
      backAction={() => router.back()}
      pagePush={pagePush}
    >
      {information && (
        <section className="flex flex-col space-y-4 text-brown-cis">
          <h2 className="text-2xl font-bold w-full text-center mb-2">
            {information.name}
          </h2>
          <p>客服時段： {information.openHour} </p>
          <p>客服專線： {information.contactPhone} </p>
          <p>地址： {information.contactAddress} </p>
          <p>Email： {information.contactEmail} </p>
          <p
            className="text-base"
            dangerouslySetInnerHTML={{
              __html: information.information.replaceAll("\n", "<br/>"),
            }}
          />
        </section>
      )}
    </Layout.Family>
  );
};

export default CardInformation;
