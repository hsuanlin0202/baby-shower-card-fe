// @ts-nocheck
import clsx from "clsx";
import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "./Button";

const getFile = (canvas, crop): Blob => {
  if (!crop || !canvas) {
    return;
  }
  // 建立 file
  const dataURL = canvas.toDataURL("image/png");
  const blobBin = atob(dataURL.split(",")[1]);
  const array = [];
  for (let i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  const file = new Blob([new Uint8Array(array)], { type: "image/png" });

  return file;
};

type Props = {
  setFile: (file: Blob) => void;
  setOpen?: (open: boolean) => void;
};
export const ImageUpload = ({ setFile, setOpen }: Props): JSX.Element => {
  const [upImg, setUpImg] = useState();

  const [isPreview, setPreview] = useState<boolean>(false);

  const imgRef = useRef(null);

  const previewCanvasRef = useRef(null);

  const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 });

  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <div className="p-4 max-h-screen flex flex-col">
      {setOpen && (
        <div className="w-full flex justify-end mb-4">
          <button type="button" onClick={() => setOpen(false)}>
            <span className="text-gray-500">
              <ClearIcon />
            </span>
          </button>
        </div>
      )}

      {!isPreview && !upImg && (
        <label
          className="flex justify-center items-center w-full h-40v border border-gray-500 text-gray-500 hover:bg-gray-100 cursor-pointer rounded-md"
          id=""
          htmlFor="filename"
        >
          <AddCircleOutlineIcon className="mr-2" /> <span>選擇圖片</span>
        </label>
      )}

      <input
        className="hidden"
        type="file"
        id="filename"
        accept="image/*"
        onChange={onSelectFile}
      />

      {!isPreview && !!upImg && (
        <div className="max-h-60v w-full overflow-hidden overflow-y-scroll">
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
        </div>
      )}

      <div className="w-full">
        <canvas
          className="mx-auto border"
          ref={previewCanvasRef}
          style={{
            width: isPreview ? Math.round(completedCrop?.width ?? 0) : 0,
            height: isPreview ? Math.round(completedCrop?.height ?? 0) : 0,
          }}
        />
        {upImg && !isPreview && (
          <p
            className={clsx(
              "w-full text-sm flex justify-between",
              crop.width < 300 && "text-red-500"
            )}
          >
            <span className="mr-2 text-gray-400">建議尺寸大於300x300</span>
            <span>{`${Math.round(crop?.width ?? 0)}x${Math.round(
              crop?.width ?? 0
            )}`}</span>
          </p>
        )}
      </div>

      {upImg && (
        <div className="w-full flex justify-between mt-4">
          {!isPreview && (
            <label
              className="flex justify-center items-center text-base font-bold rounded-lg py-2 px-4 tracking-wider hover:shadow-lg bg-blue-500 text-white active:bg-blue-600 cursor-pointer"
              id=""
              htmlFor="filename"
            >
              重選圖片
            </label>
          )}

          {isPreview && (
            <Button.Basic
              type="button"
              className="bg-blue-500 text-white active:bg-blue-600"
              onClick={() => setPreview(false)}
            >
              <span>重新裁切</span>
            </Button.Basic>
          )}

          <Button.Basic
            type="button"
            className="bg-blue-500 text-white active:bg-blue-600"
            onClick={() => {
              if (!isPreview) {
                setPreview(true);
                return;
              }

              const file = getFile(previewCanvasRef.current, completedCrop);

              setFile(file);
            }}
          >
            <span>{isPreview ? "完成" : "預覽圖片"}</span>
          </Button.Basic>
        </div>
      )}
    </div>
  );
};
