import { getPartner } from "api";
import Layout from "components/layout";
import { familyPath } from "constant/router";
import { useInitData } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthStore } from "store/auth";
import { VendorInformationTypes } from "types";

const CardComment = (): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const router = useRouter();

  const cardId = router.query.id;

  const { token } = AuthStore((state) => ({
    token: state.token,
  }));

  const pagePush = (path: string): void => {
    router.push(path.replaceAll("[id]", cardId as string));
  };

  const errorNotify = (): void =>
    showNotify(
      "open",
      "Oops!",
      "找不到留言資料，請再試一次。",
      () => {
        showNotify("close");
        router.back();
      },
      true
    );

  useEffect(() => {
    // openLoader(true);
  }, []);

  return (
    <Layout.Family
      title=""
      pathList={familyPath}
      router={router}
      backAction={() => router.back()}
      pagePush={pagePush}
    >
      <section className="flex flex-col space-y-4 text-brown-cis"></section>
    </Layout.Family>
  );
};

export default CardComment;
