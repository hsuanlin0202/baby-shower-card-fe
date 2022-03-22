import { getCard } from "api";
import { getMessages } from "api/messages";
import Layout from "components/layout";
import { BabyCommentPage } from "components/pages/baby";
import { useInitData } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthStore } from "store/auth";
import { BabyCardTypes, MessageTypes } from "types";

export default function CommentPage() {
  const router = useRouter();

  const { showNotify, openLoader } = useInitData();

  const { id } = router.query;

  const [messages, setMessages] = useState<MessageTypes[]>();

  const [card, setCard] = useState<BabyCardTypes>();

  const errorNotify = (content: string): void =>
    showNotify(
      "open",
      "Oops!",
      content,
      () => {
        showNotify("close");
        router.back();
      },
      true
    );

  const getMessagesHandler = (id: number) => {
    openLoader(true);
    getMessages(id).then((result) => {
      openLoader(false);

      setMessages(result.filter((message) => message.public === true));
    });
  };

  useEffect(() => {
    if (!id) return;

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
      getMessagesHandler(card.id);
    });
  }, [id]);

  if (!card) return <></>;

  return (
    <Layout.Baby
      title="留下祝福"
      textColor={card?.template.textColor}
      background={card?.template.background}
    >
      <BabyCommentPage
        router={router}
        card={card}
        messages={messages}
        showNotify={showNotify}
        loadMessages={() => getMessagesHandler(card.id)}
      />
    </Layout.Baby>
  );
}
