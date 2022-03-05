import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMessages, putMessages } from "api/messages";
import Layout from "components/layout";
import { familyPath } from "constant/router";
import { useInitData } from "hooks";
import { AuthStore } from "store/auth";
import { MessageTypes } from "types";
import {
  CommentCard,
  CommentTable,
  StatusControl,
} from "components/pages/family";
import { getCard, putCard } from "api";

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

  const [commentActive, setCommentActive] = useState<boolean>();

  const [messages, setMessages] = useState<MessageTypes[]>();

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

  const changeStatus = (id: number, e: boolean) => {
    putMessages(token, id, e).then((result) => {
      if (!result) return;
      getMessagesHandler();
    });
  };

  const getMessagesHandler = () => {
    openLoader(true);
    getMessages(cardId).then((result) => {
      openLoader(false);
      setMessages(result);
    });
  };

  const getCardHandler = () => {
    getCard(cardToken as string).then((result) => {
      if (!result) {
        errorNotify("找不到卡片資料，請再試一次");
        return;
      }

      setCommentActive(result.commentActive);
    });
  };

  const putCardCommentActive = (status: boolean) => {
    const formData = new FormData();

    formData.append("card-comment-active", status.toString());
    putCard(token, cardToken as string, formData)
      .then((result) => {
        openLoader(false);
        if (!result.id) {
          showNotify("open", "無法更新卡片", "請稍後再試。");
          return;
        }

        showNotify(
          "open",
          `留言功能已${status ? "開啟" : "關閉"}`,
          `寶寶的卡片已${status ? "開放" : "關閉"}留言功能。訪客${
            status ? "可以" : "無法"
          }留言，也${status ? "看得到" : "看不到"}其他留言。`
        );
      })
      .catch(() => {
        openLoader(false);
        showNotify("open", "連線逾時", "請稍候再試一次。");
      });
  };

  useEffect(() => {
    if (!cardId) {
      errorNotify("找不到留言資料，請再試一次。");
      return;
    }

    if (!!messages) return;
    getCardHandler();
    getMessagesHandler();
  }, [cardId]);

  return (
    <Layout.Family
      title="留言管理"
      pathList={familyPath}
      router={router}
      backAction={() => router.back()}
      pagePush={pagePush}
    >
      <section className="text-brown-cis">
        <StatusControl
          active={commentActive}
          changeActive={(status: boolean) => putCardCommentActive(status)}
        />

        <div className="block md:hidden">
          <CommentCard
            messages={messages}
            changeStatus={(id: number, e: boolean) => changeStatus(id, e)}
          />
        </div>

        <div className="hidden md:block">
          <CommentTable
            messages={messages}
            changeStatus={(id: number, e: boolean) => changeStatus(id, e)}
          />
        </div>
      </section>
    </Layout.Family>
  );
};

export default CardComment;
