import { useState } from "react";
import { NextRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { DateStringFormat, getContrastColorByLightness } from "functions";
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
    <div className="w-full text-base px-4">
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
        router={router}
      />

      <nav className="w-full h-10">
        <BackButton onClick={() => router.back()} />
      </nav>

      <header className="w-full h-24">
        <p>來自親朋好友溫暖的祝福</p>
        <h1 className="text-2xl mt-2">{card.babyName}，祝福你...</h1>
      </header>

      <ul className="w-full mb-20">
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

      <footer className="fixed bottom-0 py-6 w-full flex justify-center ">
        {!isOpen && (
          <button
            type="button"
            className="p-2 flex justify-center items-center text-sm rounded-lg shadow-xl colored-background"
            onClick={() => setOpen(true)}
          >
            <span>
              <AddIcon />
            </span>
            <span className="text-sm ml-1">留下祝福</span>
          </button>
        )}
      </footer>
    </div>
  );
};
