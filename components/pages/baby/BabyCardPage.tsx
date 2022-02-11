import { DateStringFormat, getContrastColorByLightness } from "functions";
import { BabyCardTypes } from "types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { SocialButton } from ".";

type Props = {
  card: BabyCardTypes;
};
export const BabyCardPage = ({ card }: Props): JSX.Element => {
  if (!card) return <></>;

  return (
    <div
      className="w-full bg-center bg-contain flex flex-col items-center"
      style={{
        color: card.template.textColor,
        backgroundImage: `url('${card.template.background}')`,
      }}
    >
      <div className="w-full md:w-phone min-h-screen pt-4 pb-10 flex flex-col items-center space-y-4">
        <div>
          {/* 這兩項暫時在api端寫死，因為資料庫還沒新增欄位 */}

          {card.template.logo && (
            <img className="h-14" src={card.template.logo} alt="logo" />
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
              __html: card.description.replaceAll("\n", "<br/>"),
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
          className="px-10 py-2 text-sm rounded-md"
          style={{
            backgroundColor: card.template.textColor,
            color: getContrastColorByLightness(card.template.textColor),
          }}
          onClick={() => {}}
        >
          <span>保存回憶</span>
        </button>

        <div className="w-full flex justify-evenly">
          <SocialButton
            icon={<FavoriteBorderIcon />}
            title="Like"
            onClick={() => {}}
          />
          <SocialButton
            icon={<ChatBubbleOutlineIcon />}
            title="Comment"
            onClick={() => {}}
          />
          <SocialButton
            icon={<ShareOutlinedIcon />}
            title="Share"
            onClick={() => {}}
          />
        </div>

        <a href="#">
          <p className="mb-4 text-xs underline">彌月禮盒滿意度調查</p>
        </a>
      </div>

      <footer className="w-full -mt-10 h-10 leading-10 bg-brown-200 text-xs text-brown-500 text-center">
        <p>Created by Joy Baby Card</p>
      </footer>
    </div>
  );
};
