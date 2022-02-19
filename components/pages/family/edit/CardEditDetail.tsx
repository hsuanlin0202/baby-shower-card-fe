import { getCard } from "api";
import { useInitData } from "hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BabyCardTypes } from "types";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Form from "components/elements/form";
import { Button, ImageUpload } from "components/elements";
import clsx from "clsx";

type Props = {
  id: string;
};

export const CardEditDetail = ({ id }: Props): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const { control, setValue, handleSubmit } = useForm();

  const [card, setCard] = useState<BabyCardTypes>();

  const [photo, setPhoto] = useState<string | ArrayBuffer>("");

  const [openImgModal, setImgModal] = useState<boolean>(false);

  const [uploadImg, setUploadImg] = useState<Blob>(null);

  const setValueList = [
    "babyName",
    "motherName",
    "fatherName",
    "babyBirthday",
    "description",
  ];
  useEffect(() => {
    if (!id || !!card) {
      return;
    }
    openLoader(true);
    getCard(id).then((result) => {
      openLoader(false);

      setCard(result);

      setValueList.forEach((key) => {
        setValue(key, result[key]);
      });

      setPhoto(result.photo);
    });
  }, [id]);

  useEffect(() => {
    if (!uploadImg) return;

    // setPhotoError(false);

    const image = new FileReader();
    image.onload = (e) => {
      setPhoto(e.target.result);
    };
    image.readAsDataURL(uploadImg);
  }, [uploadImg]);

  const onSubmit = (data): void => {
    console.log(data);
  };

  if (!card) return <></>;

  return (
    <div>
      <div
        className={clsx(
          "fixed top-0 left-0 w-screen h-screen p-4 bg-white rounded-t-3xl z-100 ",
          openImgModal ? "top-20" : "top-full"
        )}
        style={{ transition: "0.3s" }}
      >
        <ImageUpload
          isOpen={openImgModal}
          setOpen={(open) => setImgModal(open)}
          setFile={(file) => {
            setUploadImg(file);
            setImgModal(false);
          }}
          cancelIcon={<span className=" text-brown-cis text-sm">放棄上傳</span>}
        />
      </div>

      <form
        className="w-full p-0 md:p-8 flex flex-col justify-center space-y-8 text-brown-cis border-0 md:border border-brown-cis bg-white rounded-lg md:shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="flex flex-col md:flex-row space-x-0 space-y-8 md:space-x-8 md:space-y-0">
          <div
            className="relative max-w-96 md:max-w-88"
            onClick={() => setImgModal(true)}
          >
            <img src={photo as string} />
            <div className="absolute bottom-2 right-2 text-right w-full text-white">
              <SwitchAccountIcon fontSize="large" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-between space-y-8 md:space-y-0">
            <Form.Input
              label="寶寶叫什麼"
              type="text"
              name="babyName"
              control={control}
              required
            />

            <Form.Input
              label="媽媽叫什麼"
              type="text"
              name="motherName"
              control={control}
              required
            />

            <Form.Input
              label="爸爸叫什麼"
              type="text"
              name="fatherName"
              control={control}
              required
            />

            <Form.Input
              label="寶寶出生日"
              type="date"
              name="babyBirthday"
              control={control}
              required
            />
          </div>
        </div>

        <Form.Input
          label="給親友的話"
          className="w-full"
          type="text"
          name="description"
          control={control}
          rows={3}
          required
        />

        <div className="pb-2 flex justify-end space-x-0 md:space-x-4">
          <Button.Basic
            type="button"
            className="hidden md:flex text-brown-cis bg-white border border-brown-cis"
            onClick={() =>
              showNotify("open", "尚未儲存訂單", "確定要返回列表頁？", () => {
                showNotify("close", "", "");
                // router.back();
              })
            }
          >
            <span>返回</span>
          </Button.Basic>

          <Button.Basic
            type="submit"
            className="w-full md:w-auto py-3 md:p-0 bg-brown-cis text-white"
          >
            <span>儲存</span>
          </Button.Basic>
        </div>
      </form>
    </div>
  );
};
