import {
  DateStringFormat,
  getContrastColorByLightness,
  shareLinkMobile,
} from "functions";
import { BabyCardTypes } from "types";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { ShareModal, SocialButton } from ".";
import { NextRouter } from "next/router";
import { useState } from "react";

import { Modal } from "components/elements";

type Props = {
  card: BabyCardTypes;
  router: NextRouter;
  showNotify: (
    type: "open" | "close",
    title?: string,
    message?: string,
    action?: () => void,
    force?: boolean
  ) => void;
};
export const BabyCardPage = ({
  card,
  router,
  showNotify,
}: Props): JSX.Element => {
  const currentUrl = `https://www.joybabycard.com${router.asPath}`;

  const [isOpen, setOpen] = useState<boolean>(false);

  const shareLink = (): void => {
    if (window.innerWidth <= 640) shareLinkMobile(card, () => setOpen(true));
    if (window.innerWidth > 640) setOpen(true);
  };

  if (!card) return <></>;

  const shareTitle = `${card.fatherName}和${card.motherName}的寶寶滿月囉！`;

  return (
    <>
      <style jsx>
        {`
          .colored-background {
            background-color: ${card.template.textColor};
            color: ${getContrastColorByLightness(card.template.textColor)};
          }
        `}
      </style>

      <Modal.ClearButton isOpen={isOpen} setOpen={setOpen}>
        <ShareModal isInit={isOpen} url={currentUrl} title={shareTitle} />
      </Modal.ClearButton>

      <div>
        {card.template.logo && (
          <img className="h-12" src={card.template.logo} alt="logo" />
        )}

        {card.template.partner && (
          <h2 className="text-center baby-main-font">
            {card.template.partner}
          </h2>
        )}
      </div>

      <img className="w-5/6" src={card.photo} alt="babyPhoto330x330" />

      <section className="flex flex-col items-center space-y-2 baby-main-font">
        <h1 className="text-2xl font-semibold">
          {`${card.babyName}，滿月囉！`}
        </h1>

        <p
          className="max-w-80p text-base leading-relaxed text-center"
          dangerouslySetInnerHTML={{
            __html: card.description.replaceAll("\\n", "<br/>"),
          }}
        />

        <p className="text-2xl font-semibold">
          {`爸爸 ${card.fatherName}  &  媽媽 ${card.motherName}`}
        </p>
      </section>

      <div className="text-3xl font-bold baby-date-font">
        {DateStringFormat(card.babyBirthday)}
      </div>

      <button
        type="button"
        className="px-10 py-2 text-sm rounded-md colored-background"
        onClick={() => {}}
      >
        <span>保存回憶</span>
      </button>

      <div className="w-full flex justify-evenly">
        {card.commentActive && (
          <SocialButton
            icon={<ChatBubbleOutlineIcon />}
            title="留言"
            onClick={() => {
              router.push(`${router.asPath}/comment`);
            }}
          />
        )}
        <SocialButton
          icon={<ShareOutlinedIcon />}
          title="分享"
          onClick={() => shareLink()}
        />
      </div>

      <a href="#">
        <p className=" text-xs underline">彌月禮盒滿意度調查</p>
      </a>

      <footer className="w-full h-10 leading-10 colored-background md:bg-transparent text-xs text-center">
        <p>Created by Joy Baby Card</p>
      </footer>
    </>
  );
};
