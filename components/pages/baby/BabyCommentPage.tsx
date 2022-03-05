import { DateStringFormat, getContrastColorByLightness } from "functions";
import { NextRouter } from "next/router";
import { useState } from "react";
import { BabyCardTypes, MessageTypes } from "types";
import { BackButton, CommentModal } from ".";

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
};

export const BabyCommentPage = ({
  router,
  messages,
  card,
  showNotify,
}: Props): JSX.Element => {
  if (!messages) return <></>;

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-full px-6 pb-4 flex flex-col justify-around items-center space-y-4 text-base">
      <style jsx>
        {`
          .textColor {
            color: ${card.template.textColor};
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
        router={router}
      />

      <nav className="w-full">
        <BackButton onClick={() => router.back()} />
      </nav>

      <header className="w-full">
        <p>來自親朋好友溫暖的祝福</p>
        <h1 className="text-2xl mt-2 -mb-4">{card.babyName}，祝福你...</h1>
      </header>

      <ul className="w-full h-70v overflow-y-scroll">
        {messages.map((message, index) => (
          <div
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
          </div>
        ))}
      </ul>

      <footer>
        <button
          type="button"
          className="px-10 py-2 text-sm rounded-md colored-background"
          onClick={() => setOpen(true)}
        >
          <span>留下祝福</span>
        </button>
      </footer>
    </div>
  );
};
