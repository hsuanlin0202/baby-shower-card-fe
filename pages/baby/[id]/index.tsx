import { getCard } from "api/card/getCard";
import Layout from "components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BabyCardTypes } from "types";
import { BabyCardPage } from "components/pages/baby";
import { useInitData } from "hooks";
import { AuthStore } from "store/auth";

export default function BabyCard() {
  const { showNotify, openLoader } = useInitData();

  const router = useRouter();

  const { id } = router.query;

  const [card, setCard] = useState<BabyCardTypes>();

  // const { setBabyCardId } = AuthStore((state) => ({
  //   setBabyCardId: state.setBabyCardId,
  // }));

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
          },
          true
        );
        return;
      }
      // setBabyCardId(card.id);
      setCard(card);
    });
  }, []);

  return (
    <Layout.Baby title={card?.babyName} textColor={card?.template.textColor}>
      <BabyCardPage card={card} router={router} showNotify={showNotify} />
    </Layout.Baby>
  );
}
