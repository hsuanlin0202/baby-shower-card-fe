import { useState } from "react";
import { NextRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { DateStringFormat, getContrastColorByLightness } from "functions";
import { BabyCardTypes, MessageTypes } from "types";
import { BackButton, CommentModal } from ".";
import clsx from "clsx";

type Props = {
  router: NextRouter;
  messages: MessageTypes[];
  card: BabyCardTypes;
  showNotify: (
    type: "open" | "close",
    title?: string,
    message?: string,
    action?: () => void,
    force?: boolean
  ) => void;
  loadMessages: () => void;
};

export const BabyCommentPage = ({
  router,
  messages,
  card,
  showNotify,
  loadMessages,
}: Props): JSX.Element => {
  if (!messages) return <></>;

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "w-full text-base p-4",
        messages.length === 0 && "h-full"
      )}
    >
      <style jsx>
        {`
          .textColor {
            color: ${card.template.textColor};
          }
          .card-background-image-dynamic {
            background-image: url("${card.template.background}");
            background-position: center;
            background-size: 100%;
          }
          .colored-background {
            background-color: ${card.template.textColor};
            color: ${getContrastColorByLightness(card.template.textColor)};
          }
        `}
      </style>

      <CommentModal
        isOpen={isOpen}
        setOpen={setOpen}
        card={card}
        showNotify={showNotify}
        loadMessages={loadMessages}
      />

      <nav className="w-full h-10">
        <BackButton onClick={() => router.back()} />
      </nav>

      {messages.length > 0 && (
        <header className="w-full h-24">
          <p>來自親朋好友溫暖的祝福</p>
          <h1 className="text-2xl mt-2">{card.babyName}，祝福你...</h1>
        </header>
      )}

      {messages.length > 0 && (
        <ul className="w-full mb-24">
          {messages.map((message, index) => (
            <li
              key={`message-${index}`}
              className="w-full bg-brown-600 rounded-lg p-4 mb-5"
            >
              <h2 className="flex justify-between items-center pb-2">
                <span className="font-bold">{message.author}</span>
                <span className="text-sm">
                  {DateStringFormat(message.createdAt)}
                </span>
              </h2>
              <p>{message.content}</p>
            </li>
          ))}
        </ul>
      )}

      <footer
        className={clsx(
          "fixed bottom-2 left-0 py-6 w-full flex flex-col items-center justify-center text-lg",
          messages.length === 0 && "h-screen top-10"
        )}
      >
        {messages.length == 0 && (
          <div className="mb-6 -mt-48">留下給{card.babyName}的祝福吧！</div>
        )}

        {!isOpen && (
          <button
            type="button"
            className="px-4 py-2 flex justify-center items-center rounded-lg shadow-xl colored-background"
            onClick={() => setOpen(true)}
          >
            <span>
              <AddIcon />
            </span>
            <span className="ml-4">留下祝福</span>
          </button>
        )}
      </footer>
    </div>
  );
};
