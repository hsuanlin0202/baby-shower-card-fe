// @ts-nocheck
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "components/elements";
import { FormGroup } from "./FormGroup";
import { AuthStore } from "store/auth";
import { putPartner } from "api";
import { useInitData } from "hooks";
import { VendorInformationTypes } from "types";
import Form from "components/elements/form";

type PartnerProps = {
  information: VendorInformationTypes;
  updateMode: (mode: "view" | "edit") => void;
  updateDate: () => void;
};

export const PartnerDetail = ({
  updateMode,
  information,
  updateDate,
}: PartnerProps): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<VendorInformationTypes>();

  const { token, partners } = AuthStore((state) => ({
    token: state.token,
    partners: state.partners,
  }));

  const onSubmit = (data: VendorInformationTypes): void => {
    if (!isDirty) {
      updateMode("view");
      return;
    }

    // console.log(data);
    openLoader(true);
    putPartner(data, partners[0], token).then((res) => {
      openLoader(false);
      // console.log(res);
      updateMode("view");
      updateDate();
    });
  };

  useEffect(() => {
    if (!information) return;

    Object.keys(information).forEach((val: keyof VendorInformationTypes, _) =>
      setValue(val, information[val])
    );
  }, [information]);

  return (
    <form
      className="w-full mb-6 flex flex-col border-none md:border rounded-none md:rounded-lg shadow-none md:shadow-lg py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormGroup title="廠商名稱" contentSpace="w-full md:w-1/2">
        <Form.Input
          type="text"
          name="name"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      {/* <FormGroup title="聯絡人" contentSpace="w-1/2">
        <Form.Input
          type="text"
          name="contact"
          control={control}
          required
          size="small"
        />
      </FormGroup> */}

      <FormGroup title="聯絡電話" contentSpace="w-full md:w-1/2">
        <Form.Input
          type="text"
          name="contactPhone"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="聯絡地址" contentSpace="w-full md:w-1/2">
        <Form.Input
          type="text"
          name="contactAddress"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="聯絡信箱" contentSpace="w-full md:w-1/2">
        <Form.Input
          type="text"
          name="contactEmail"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="營業時間" contentSpace="w-full md:w-1/2">
        <Form.Input
          type="text"
          name="openHour"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="其他說明" contentSpace="w-full">
        <Form.Input
          type="text"
          name="information"
          control={control}
          required
          rows={10}
          size="small"
        />
      </FormGroup>

      <hr className="my-8" />

      <div className="flex justify-end items-center space-x-4 px-4">
        <Button.Basic
          type="button"
          className="text-blue-500 bg-white"
          onClick={() => {
            if (!isDirty) {
              updateMode("view");
              return;
            }

            showNotify("open", "尚未儲存資料", "確定要返回？", () => {
              showNotify("close", "", "");
              updateMode("view");
            });
          }}
        >
          <span>返回</span>
        </Button.Basic>

        <Button.Basic
          type="submit"
          className="bg-blue-500 text-white active:bg-blue-600"
        >
          <span>確認修改</span>
        </Button.Basic>
      </div>
    </form>
  );
};
