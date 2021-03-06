import { useRef, useState } from "react";
import { NextRouter } from "next/router";
import html2canvas from "html2canvas";
import CollectionsIcon from "@mui/icons-material/Collections";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
  DateStringFormat,
  getContrastColorByLightness,
  shareLinkMobile,
} from "functions";
import { BabyCardTypes } from "types";
import { ShareModal, SocialButton } from ".";
import { Modal } from "components/elements";

const loadImage = (src: string, onload: () => void) => {
  let img = new Image();
  img.onload = onload;
  img.src = src;
  return img;
};

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
  if (!card) return <></>;

  const exportRef = useRef();

  const [imgTest, setImg] = useState<string>();

  const currentUrl = `https://www.joybabycard.com${router.asPath}`;

  const shareTitle = `${card.fatherName}和${card.motherName}的寶寶滿月囉！來看看可愛的寶寶並留下祝福吧！`;

  const [isOpen, setOpen] = useState<boolean>(false);

  const shareLink = (): void => {
    if (window.innerWidth <= 640)
      shareLinkMobile(currentUrl, shareTitle, () => {});

    if (window.innerWidth > 640) setOpen(true);
  };
  const exportAsImage = async (element, imageFileName) => {
    const html = document.getElementsByTagName("html")[0];
    const body = document.getElementsByTagName("body")[0];
    let htmlWidth = html.clientWidth;
    let bodyWidth = body.clientWidth;
    const newWidth = element.scrollWidth - element.clientWidth;
    if (newWidth > element.clientWidth) {
      htmlWidth += newWidth;
      bodyWidth += newWidth;
    }
    html.style.width = htmlWidth + "px";
    body.style.width = bodyWidth + "px";
    const canvas = await html2canvas(element, {
      allowTaint: false,
      useCORS: true,
      logging: true,
    }).then(save);
    // const image = canvas.toDataURL("image/png", 1.0);
    // downloadImage(image, imageFileName);
    // html.style.width = null;
    // body.style.width = null;
  };

  function save(canvas) {
    /*html2canvas-0.5.0 work with Promise.js*/
    setImg(canvas.toDataURL());
  }

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  const clickBtn = (): void => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const img1 = loadImage(
      "https://www.car-plus.com.tw/static/driver/img-driver-faq-24-hrs.jpg",
      () => {
        main(ctx, img1);
      }
    );
  };

  const main = (
    ctx: CanvasRenderingContext2D,
    img1: HTMLImageElement
  ): void => {
    img1.setAttribute("crossOrigin", "anonymous");

    ctx.drawImage(img1, 0, 0);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Hello World", 256, 256);
  };

  const joySpecial = (): void => {
    if (card.id !== 11) return;
    showNotify("open", "", "是否要開啟寶寶相簿？", () => {
      window.open("https://photos.app.goo.gl/arL5YzPKQxouBnfA6", "_blank");
      showNotify("close");
    });
  };

  return (
    <div className="h-full py-6 flex flex-col items-center justify-between space-y-4">
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

      {/* {imgTest && <img src={imgTest} />} */}
      {/* <canvas width="512" height="512" id="canvas"></canvas> */}

      <div
        ref={exportRef}
        className="flex flex-col justify-center items-center space-y-4"
      >
        <div>
          {card.template.logo && (
            <img className="h-8" src={card.template.logo} alt="logo" />
          )}

          {card.template.partner && (
            <h2 className="text-center baby-main-font">
              {card.template.partner}
            </h2>
          )}
        </div>

        <div className="relative cursor-pointer" onClick={() => joySpecial()}>
          <img className="w-75 h-75" src={card.photo} alt="babyPhoto300x300" />
          {card.id === 11 && (
            <button className="opacity-70 absolute bottom-0 right-0 p-1 text-xs flex items-center rounded-full border border-white focus:outline-none">
              <span>
                <CollectionsIcon />
              </span>
            </button>
          )}
        </div>

        <section className="flex flex-col items-center space-y-4 baby-main-font">
          <h1 className="text-2xl font-semibold">
            {`${card.babyName}，滿月囉！`}
          </h1>

          <p
            className=" text-base leading-relaxed text-center"
            dangerouslySetInnerHTML={{
              __html: card.description
                .replaceAll("\n", "<br/>")
                .replaceAll("\\n", "<br/>")
                .replaceAll("\r\n", "<br/>"),
            }}
          />

          <p className="text-2xl font-semibold">
            {`爸爸 ${card.fatherName}  &  媽媽 ${card.motherName}`}
          </p>
        </section>

        <div className="text-center font-bold baby-date-font">
          <p className="text-xl">Born on</p>
          <p className="text-3xl">{DateStringFormat(card.babyBirthday)}</p>
        </div>
      </div>

      {/* <button
        type="button"
        className="px-10 py-2 text-sm rounded-md colored-background"
        onClick={() => exportAsImage(exportRef.current, "test")}
        // onClick={clickBtn}
      >
        <span>保存回憶</span>
      </button> */}

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

      {/* <a href="#">
        <p className="text-xs underline">彌月禮盒滿意度調查</p>
      </a> */}

      {/* <footer className="w-full h-10 leading-10 colored-background md:bg-transparent text-xs text-center">
        <p>Created by Joy Baby Card</p>
      </footer> */}
    </div>
  );
};
