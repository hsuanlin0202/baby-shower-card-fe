import { getCard } from "api/card/getCard";
import Layout from "components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BabyCardTypes } from "types";
import { BabyCardPage } from "components/pages/baby";
import { useInitData } from "hooks";

export default function BabyCard() {
  const { showNotify, openLoader } = useInitData();

  const router = useRouter();

  const { id } = router.query;

  const [card, setCard] = useState<BabyCardTypes>();

  useEffect(() => {
    if (!id) router.push("/baby");

    openLoader(true);
    getCard(id.toString()).then((card) => {
      openLoader(false);
      if (!card) {
        showNotify(
          "open",
          "找不到寶寶彌月卡",
          "請再次確認您的幸福密碼喔！",
          () => {
            showNotify("close", "", "");
            router.push("/baby");
          }
        );
        return;
      }

      setCard(card);
    });
  }, []);

  return (
    <Layout.Base title={card?.babyName || ""}>
      <BabyCardPage card={card} />
    </Layout.Base>
  );
}
