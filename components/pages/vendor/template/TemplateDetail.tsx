import { useEffect, useState } from "react";
import { NextRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Modal } from "@mui/material";
import clsx from "clsx";
import { FormGroup } from "../order";
import Form from "components/elements/form";
import { Button, ColorPicker } from "components/elements";
import { useInitData } from "hooks";
import { BabyCardPreview } from "./BabyCardPreview";
import { ImageUploadButton } from "./ImageUploadButton";
import { organizeTemplateFormData, onChangePicture } from "functions/page";
import { ImageUploadTypes, TemplateFormTypes, TemplateTypes } from "types";
import { getTemplate, postTemplates, putTemplates } from "api";
import { AuthStore } from "store/auth";

type Props = {
  id: string;
  router: NextRouter;
};

export const TemplateDetail = ({ id, router }: Props): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const { token, username } = AuthStore((state) => ({
    token: state.token,
    username: state.username,
  }));

  const { control, setValue, getValues, handleSubmit } =
    useForm<TemplateFormTypes>();

  const [template, setTemplate] = useState<TemplateTypes>();

  const [logoData, setLogoData] = useState<ImageUploadTypes>(null);

  const [bgData, setBgData] = useState<ImageUploadTypes>(null);

  const [color, setColor] = useState<string>("#000");

  const [openPreview, setPreview] = useState<boolean>(false);

  const onSubmit = (data: any): void => {
    const formData = organizeTemplateFormData(
      data,
      color,
      bgData.blob,
      logoData.blob,
      username
    );

    if (!id) newTemplate(formData);

    if (!!id) editTemplate(formData);
  };

  const newTemplate = (formData: FormData): void => {
    console.log("POST");

    postTemplates(token, formData).then((result) => {
      console.log(result);
    });
  };

  const editTemplate = (formData: FormData): void => {
    console.log("PUT");
    putTemplates(token, id, formData).then((result) => {
      console.log(result);
    });
  };

  useEffect(() => {
    if (!id || !!template) {
      return;
    }
    openLoader(true);
    getTemplate(id).then((result) => {
      openLoader(false);
      if (!result) {
        showNotify(
          "open",
          "找不到模板",
          "請再試一次",
          () => {
            showNotify("close");
            router.replace("/vendor/template");
          },
          true
        );
        return;
      }

      setTemplate(result);
      setLogoData({ ...logoData, string: result.partnerLogo });
      setBgData({ ...bgData, string: result.backgroundImage });
      setColor(result.color);
      setValue("partner-name", result.partnerName);
      setValue("name", result.name);
    });
  }, [id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal open={openPreview} onClose={setPreview}>
        <div
          className="w-screen h-screen flex justify-center items-center p-4"
          onClick={() => setPreview(false)}
        >
          <BabyCardPreview
            logo={(logoData?.string as string) || ""}
            background={(bgData?.string as string) || ""}
            partner={getValues("partner-name")}
            color={color}
          />
        </div>
      </Modal>

      <h2 className="text-2xl font-bold">{id ? `編輯模板` : "新增模板"}</h2>

      <div className="border rounded-lg shadow-lg py-4 my-4">
        {/* <FormGroup title="開放模板">
          <Form.Input type="switch" name="template-active" control={control} />
        </FormGroup> */}
        <FormGroup title="模板名稱" required>
          <Form.Input
            type="text"
            name="name"
            control={control}
            size="small"
            required
          />
        </FormGroup>

        <FormGroup
          title="Logo圖片"
          contentSpace="w-full"
          note={<p className=" text-sm text-gray-500">格式：JPG或PNG。</p>}
        >
          <div className="flex items-center space-x-2">
            <ImageUploadButton
              isSelected={!!logoData}
              imgPath={logoData?.string as string}
              htmlFor="logo"
            />

            <input
              className="hidden"
              type="file"
              id="logo"
              accept="image/*"
              onChange={(e) => onChangePicture(e, setLogoData)}
            />
          </div>
        </FormGroup>

        <FormGroup title="店家名稱">
          <Form.Input
            type="text"
            name="partner-name"
            control={control}
            size="small"
          />
        </FormGroup>

        <FormGroup
          title="背景圖片"
          contentSpace="w-full"
          note={<p className=" text-sm text-gray-500">格式：JPG或PNG。</p>}
          required
        >
          <div className="flex items-center space-x-2">
            <ImageUploadButton
              isSelected={!!bgData}
              imgPath={bgData?.string as string}
              htmlFor="bg"
            />

            <input
              className="hidden"
              type="file"
              id="bg"
              accept="image/*"
              onChange={(e) => onChangePicture(e, setBgData)}
            />
          </div>
        </FormGroup>

        <FormGroup title="文字顏色" required>
          <ColorPicker color={color} setColor={setColor} />
        </FormGroup>

        <div className="flex items-center justify-between mt-8 px-8 pt-6 pb-2 border-t">
          <Button.Basic
            type="button"
            className={clsx(
              "text-white active:bg-blue-600",
              bgData ? " bg-orange-cis opacity-70" : "bg-gray-300"
            )}
            onClick={() => {
              if (!bgData) return;
              setPreview(true);
            }}
          >
            <span>預覽卡片</span>
          </Button.Basic>

          <div className="flex space-x-4">
            <Button.Basic
              type="button"
              className="text-blue-cis border border-blue-cis bg-white"
              onClick={() =>
                showNotify("open", "尚未儲存模板", "確定要返回列表頁？", () => {
                  showNotify("close", "", "");
                  router.back();
                })
              }
            >
              <span>返回</span>
            </Button.Basic>

            <Button.Basic
              type="submit"
              className="bg-blue-cis text-white active:bg-blue-600"
            >
              <span>儲存</span>
            </Button.Basic>
          </div>
        </div>
      </div>
    </form>
  );
};
