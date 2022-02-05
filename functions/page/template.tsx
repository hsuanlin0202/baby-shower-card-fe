import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Resizer from "react-image-file-resizer";
import { ImageUploadTypes } from "types";
export const organizeTemplateFormData = (
  data: any,
  color: string,
  background: Blob,
  logo: Blob
): FormData => {
  const timestamp = new Date().getTime();

  const organizedData = {
    name: data.name,
    color: color,
  };
  if (data.partner) organizedData["partner"] = data.partner;

  const formData = new FormData();

  for (const name in organizedData) {
    formData.append(name, organizedData[name]);
  }

  formData.append("background", background, `${data.name}_bg_${timestamp}.png`);

  if (logo) formData.append("logo", logo, `${data.name}_logo_${timestamp}.png`);

  return formData;
};

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      780,
      1688,
      file.type.replace("image/", "").toUpperCase(),
      75,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });

export const onChangePicture = async (
  e: ChangeEvent<HTMLInputElement>,
  setData: Dispatch<SetStateAction<ImageUploadTypes>>
) => {
  if (e.target.files[0]) {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);

      const show = new FileReader();
      show.onload = (e) => {
        setData({ blob: image as Blob, string: e.target.result });
      };
      show.readAsDataURL(image as Blob);
    } catch (err) {
      console.log(err);
    }
  }
};

export const getContrastColorByLightness = (color: string): string => {
  let hex = color;
  if (hex.indexOf("#") === 0) hex = hex.slice(1);

  if (hex.length === 3)
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

  const r = 255 - parseInt(hex.slice(0, 2), 16),
    g = 255 - parseInt(hex.slice(2, 4), 16),
    b = 255 - parseInt(hex.slice(4, 6), 16);

  if (r + g + b > 250) return "#FFFFFF";
  return "#000000";
};
