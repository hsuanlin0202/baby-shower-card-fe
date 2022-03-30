import { CardFormType } from "types";

export const resize = (image: Blob, size: number): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    const reader = new FileReader();

    // Read the file
    reader.readAsDataURL(image);

    // Manage the `load` event
    reader.addEventListener("load", (e) => {
      // Create new image element
      const element = new Image();
      element.addEventListener("load", () => {
        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");
        canvas.width = size;
        canvas.height = (size / element.width) * element.height;
        context.drawImage(
          element,
          0,
          0,
          size,
          (size / element.width) * element.height
        );

        // Get the data of resized image
        "toBlob" in canvas
          ? canvas.toBlob(function (blob) {
              resolve(blob);
            })
          : resolve(dataUrlToBlob(canvas.toDataURL()));
      });

      // Set the source
      element.src = e.target.result as string;
    });

    reader.addEventListener("error", function (e) {
      reject();
    });
  });
};

export const dataUrlToBlob = function (url) {
  const array = url.split(",");
  const type = array[0].match(/:(.*?);/)[1];
  const string = atob(array[1]);
  let length = string.length;

  const uintArr = new Uint8Array(length);
  while (length--) {
    uintArr[length] = string.charCodeAt(length);
  }
  return new Blob([uintArr], { type: type });
};

export const resizeImage = (img, size) => {
  const canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;
  document.body.appendChild(canvas);
  ctx.drawImage(img, 0, 0, size, size);
  return canvas;
};

export const organizeCardFormData = (
  data: CardFormType,
  image: Blob | null
) => {
  const organizedData = {
    ...data,
    "card-baby-birthday": new Date(data["card-baby-birthday"]).toJSON(),
  };

  const formData = new FormData();

  for (const name in organizedData) {
    formData.append(name, organizedData[name]);
  }

  if (!!image)
    formData.append(
      "card-photo",
      image,
      `${data["card-baby-name"] + new Date().getTime()}.png`
    );

  if (!image) formData.append("card-photo", "");

  return formData;
};
