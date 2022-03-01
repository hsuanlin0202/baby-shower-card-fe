import { getCard } from "api";
import { Button } from "components/elements";
import Layout from "components/layout";
import { familyPath } from "constant/router";
import { useInitData } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BabyCardTypes } from "types";

type Props = {};

const CardMenu = ({}: Props): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const router = useRouter();

  const cardId = router.query.id;

  const [card, setCard] = useState<BabyCardTypes>();

  const pushPage = (page: string) => {
    if (page === "logout") {
      router.push("/logout");
      return;
    }

    router.push(page.replace("[id]", cardId.toString()));
  };

  const errorNotify = (): void =>
    showNotify(
      "open",
      "Oops!",
      "找不到卡片資料，請再試一次。",
      () => {
        showNotify("close");
        router.back();
      },
      true
    );

  useEffect(() => {
    if (window.innerWidth > 640) pushPage(familyPath[0].path);
  }, []);

  useEffect(() => {
    if (!!card) return;

    if (!cardId) {
      errorNotify();
      return;
    }

    openLoader(true);

    getCard(cardId as string).then((result) => {
      openLoader(false);

      setCard(result);
    });
  }, [cardId]);

  if (!card) return <></>;

  return (
    <Layout.Base className="card-background-image h-screen pt-12 flex flex-col items-center space-y-8">
      <p className="text-xl text-brown-cis">{`${card.template.partner}`}</p>

      <h1 className="text-2xl font-bold text-brown-cis">{`${card.babyName} 彌月卡片`}</h1>

      {familyPath.map((path, index) => (
        <Button.Basic
          key={`path-button-${index}`}
          type="button"
          className="py-4 w-3/5 text-lg bg-brown-cis text-white"
          onClick={() => pushPage(path.path)}
        >
          <span>{path.title}</span>
        </Button.Basic>
      ))}
    </Layout.Base>
  );
};

export default CardMenu;
