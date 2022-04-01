import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getCard } from "api/card/getCard";
import { BabyCardTypes } from "types";
import Layout from "components/layout";
import { BabyCardPage } from "components/pages/baby";
import { useInitData } from "hooks";
import { getContrastColorByLightness } from "functions";

export default function BabyCard() {
  const { showNotify, openLoader } = useInitData();

  const router = useRouter();

  const { id } = router.query;

  const [card, setCard] = useState<BabyCardTypes>();

  useEffect(() => {
    if (!id) router.push("/baby");

    getCardHandler(id.toString());
  }, []);

  const getCardHandler = (id: string): void => {
    openLoader(true);
    getCard(id).then((card) => {
      openLoader(false);
      if (!card) {
        showNotify(
          "open",
          "Oops!",
          "請重新整理。",
          () => {
            showNotify("close");
            router.reload();
          },
          true
        );
        // showNotify(
        //   "open",
        //   "找不到寶寶彌月卡",
        //   "請再次確認您的幸福密碼喔！",
        //   () => {
        //     showNotify("close", "", "");
        //     router.push("/baby");
        //   },
        //   true
        // );
        // getCardHandler(id);
        return;
      }
      // setBabyCardId(card.id);
      setCard(card);
    });
  };

  if (!card)
    return (
      <>
        <Head>
          <meta property="og:title" content={`寶寶滿月了！`} />
          <meta
            property="og:description"
            content={`來看看可愛的寶寶並留下祝福吧！`}
          />
          <meta
            property="og:image"
            content="https://storage.googleapis.com/baby-shower-baby-image/joybb-愷心1648658560039-1648658570273.png"
          />
          <meta property="og:image:alt" content={`寶寶滿月了！`} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />
        </Head>
      </>
    );

  return (
    <Layout.Baby
      title={card?.babyName}
      textColor={card?.template.textColor}
      background={card?.template.background}
    >
      <style jsx>
        {`
          .colored-background {
            background-color: ${card?.template.textColor};
            color: ${getContrastColorByLightness(card?.template.textColor)};
          }
          .children-height {
            min-height: calc(100% - 40px);
          }
        `}
      </style>
      <div className="w-full flex-1 flex flex-col justify-between">
        <div className="h-full">
          <BabyCardPage card={card} router={router} showNotify={showNotify} />
        </div>

        <footer className="w-full h-10 leading-10 colored-background md:bg-transparent text-xs text-center">
          <p>Created by Joy Baby Card</p>
        </footer>
      </div>
    </Layout.Baby>
  );
}
