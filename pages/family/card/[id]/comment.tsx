import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMessages } from "api/messages";
import Layout from "components/layout";
import { familyPath } from "constant/router";
import { useInitData } from "hooks";
import { AuthStore } from "store/auth";
import { MessageTypes } from "types";
import { CommentCard, StatusControl } from "components/pages/family";

const CardComment = (): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const router = useRouter();

  const cardToken = router.query.id;

  const { token, cardId } = AuthStore((state) => ({
    token: state.token,
    cardId: state.orders[0],
  }));

  const pagePush = (path: string): void => {
    router.push(path.replaceAll("[id]", cardToken as string));
  };

  const [messages, setMessages] = useState<MessageTypes[]>();

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
    if (!cardId) {
      errorNotify();
      return;
    }

    if (!!messages) return;

    openLoader(true);
    getMessages(cardId).then((result) => {
      openLoader(false);
      console.log(result);
      setMessages(result);
    });
  }, [cardId]);

  return (
    <Layout.Family
      title="留言管理"
      pathList={familyPath}
      router={router}
      backAction={() => router.back()}
      pagePush={pagePush}
    >
      <style>{`
      .cards{
        columns:3;
        column-gap: 16px;
      }`}</style>
      <section className=" text-brown-cis">
        <StatusControl active={true} showNotify={showNotify} />

        <div className="block md:hidden">
          {messages?.map((message, index) => (
            <CommentCard
              key={`message-${index}`}
              message={message}
              showNotify={showNotify}
            />
          ))}
        </div>

        <div className="hidden md:block cards">
          {messages?.map((message, index) => (
            <CommentCard
              key={`message-${index}`}
              message={message}
              showNotify={showNotify}
            />
          ))}
        </div>
      </section>
    </Layout.Family>
  );
};

export default CardComment;
