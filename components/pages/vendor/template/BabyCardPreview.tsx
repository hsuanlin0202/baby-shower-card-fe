import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { SocialButton } from "components/pages/baby";
import { getContrastColorByLightness } from "functions";

type Props = {
  logo: string;
  background: string;
  color: string;
  partner: string;
};

export const BabyCardPreview = ({
  logo,
  background,
  color,
  partner,
}: Props): JSX.Element => {
  const contrastColor = getContrastColorByLightness(color);
  return (
    <div
      className="bg-white w-full rounded-lg bg-cover bg-center overflow-hidden overflow-y-scroll"
      style={{
        width: 375,
        height: 667,
        backgroundImage: `url(${background})`,
        color: color,
      }}
    >
      <div className="my-6 flex flex-col items-center justify-evenly space-y-4 baby-main-font">
        <div className="text-center text-base font-bold" style={{ width: 156 }}>
          {logo && <img className="max-h-14" src={logo} />}
          {partner && <p>{partner}</p>}
        </div>

        <img src="https://i.imgur.com/YGE2dgR.jpeg" className="w-4/5" />

        <div className="text-center text-2xl font-bold flex flex-col space-y-1">
          <p>寶寶滿月囉！</p>
          <p className="text-base font-normal">
            謝謝各位
            <br />
            親朋好友的祝福：）
            <br />
            與您分享 這份幸福的喜悅
          </p>

          <p>爸爸：小明 ＆ 媽媽：小花</p>

          <p className="baby-date-font text-3xl">2022/03</p>
        </div>
        <div
          className="px-4 py-2 rounded"
          style={{ background: color, color: contrastColor }}
        >
          保存回憶
        </div>

        <div className="w-4/5 flex justify-evenly">
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
      </div>
    </div>
  );
};
