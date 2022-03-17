import { Button } from "components/elements";
import { useEffect, useRef, useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  EmailIcon,
} from "react-share";

type Props = {
  isInit: boolean;
  url: string;
  title: string;
};

export const ShareModal = ({ isInit, url, title }: Props): JSX.Element => {
  const shareUrlRef = useRef<HTMLInputElement>(null);

  const [isCopied, setCopy] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (!shareUrlRef.current) return;
    shareUrlRef.current.value = url;
    shareUrlRef.current.select();
    document.execCommand("copy");
    setCopy(true);
  };

  useEffect(() => {
    setCopy(false);
  }, [isInit]);
  return (
    <div className="m-2 mb-4 -mt-4">
      <div className="flex justify-center space-x-4">
        <FacebookShareButton url={url} quote={title} className="">
          <FacebookIcon size={48} round />
        </FacebookShareButton>

        <LineShareButton url={url} title={title} className="">
          <LineIcon size={48} round />
        </LineShareButton>

        <EmailShareButton url={url} title={title} body={title} className="">
          <EmailIcon size={48} round />
        </EmailShareButton>
      </div>
      <div className="mt-4 flex justify-center items-center space-x-4">
        <input
          className="w-52 p-2 border rounded text-sm"
          type="text"
          value={url}
          ref={shareUrlRef}
          readOnly
        />
        <Button.Basic
          type="button"
          className=" bg-blue-cis text-white text-sm"
          onClick={copyToClipboard}
        >
          <span>複製連結</span>
        </Button.Basic>
      </div>

      {isCopied && <p className="px-1 text-sm text-red-cis">連結已複製！</p>}
    </div>
  );
};
