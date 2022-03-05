import { getCard, putCard } from "api";
import { useInitData } from "hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BabyCardTypes, CardFormType } from "types";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Form from "components/elements/form";
import { Button, ImageUpload, Modal } from "components/elements";
import { organizeCardFormData } from "functions";
import { AuthStore } from "store/auth";
import { NextRouter } from "next/router";

const setValueList: Array<{ get: string; put: keyof CardFormType }> = [
  { get: "babyName", put: "card-baby-name" },
  { get: "motherName", put: "card-mother-name" },
  { get: "fatherName", put: "card-father-name" },
  { get: "babyBirthday", put: "card-baby-birthday" },
  { get: "description", put: "card-description" },
];

type Props = {
  id: string;
  router: NextRouter;
};

export const CardEditDetail = ({ id, router }: Props): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const { token } = AuthStore((state) => ({
    token: state.token,
  }));

  const { control, setValue, handleSubmit } = useForm<CardFormType>();

  const [card, setCard] = useState<BabyCardTypes>();

  const [photo, setPhoto] = useState<string | ArrayBuffer>("");

  const [openImgModal, setImgModal] = useState<boolean>(false);

  const [uploadImg, setUploadImg] = useState<Blob>(null);

  useEffect(() => {
    if (!id) {
      getCardFailNotify();
      return;
    }

    if (!!card) return;

    openLoader(true);

    getCard(id).then((result) => {
      openLoader(false);

      if (!result) {
        getCardFailNotify();
        return;
      }

      setCard(result);

      setValueList.forEach((key) => {
        setValue(key.put, result[key.get]);
      });

      setPhoto(result.photo);
    });
  }, [id]);

  const getCardFailNotify = () =>
    showNotify(
      "open",
      "找不到卡片",
      "請再試一次",
      () => {
        showNotify("close");
        router.replace(`/family/card/${id}/menu`);
      },
      true
    );

  useEffect(() => {
    if (!uploadImg) return;

    const image = new FileReader();
    image.onload = (e) => {
      setPhoto(e.target.result);
    };
    image.readAsDataURL(uploadImg);
  }, [uploadImg]);

  const onSubmit = (data: CardFormType): void => {
    const formData = organizeCardFormData(data, uploadImg);

    openLoader(true);
    putCard(token, id, formData)
      .then((result) => {
        openLoader(false);
        if (!result.id) {
          showNotify("open", "無法更新卡片", "請稍後再試。");
          return;
        }

        showNotify("open", "", "卡片更新成功");
      })
      .catch(() => {
        openLoader(false);
        showNotify("open", "連線逾時", "請稍候再試一次。");
      });
  };

  if (!card) return <></>;

  return (
    <div>
      <Modal.Base isOpen={openImgModal} setOpen={setImgModal}>
        <div className="bg-white w-full max-w-none md:max-w-60p rounded-lg">
          <ImageUpload
            isOpen={openImgModal}
            setOpen={(open) => setImgModal(open)}
            setFile={(file) => {
              setUploadImg(file);
              setImgModal(false);
            }}
          />
        </div>
      </Modal.Base>

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
              name="card-baby-name"
              control={control}
              required
            />

            <Form.Input
              label="媽媽叫什麼"
              type="text"
              name="card-mother-name"
              control={control}
              required
            />

            <Form.Input
              label="爸爸叫什麼"
              type="text"
              name="card-father-name"
              control={control}
              required
            />

            <Form.Input
              label="寶寶出生日"
              type="date"
              name="card-baby-birthday"
              control={control}
              required
            />
          </div>
        </div>

        <Form.Input
          label="給親友的話"
          className="w-full"
          type="text"
          name="card-description"
          control={control}
          rows={3}
          required
        />

        <div className="pb-2 md:pb-0 flex justify-end">
          <Button.Basic
            type="submit"
            className="w-full md:w-auto py-3 md:py-2 md:p-0 bg-brown-cis text-white"
          >
            <span>儲存</span>
          </Button.Basic>
        </div>
      </form>
    </div>
  );
};
