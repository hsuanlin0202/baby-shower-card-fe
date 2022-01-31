// @ts-nocheck-
import { useForm } from "react-hook-form";
import Form from "components/elements/form";
import { Button } from "components/elements";
import { CardTypes, OrderFormType, OrderTypes } from "types";
import { toLocalDateTimeString } from "functions";
import { FormGroup } from "./FormGroup";
import { useEffect } from "react";
import { useInitData } from "hooks";
import { NextRouter } from "next/router";
import { postOrder } from "api/order";
import { AuthStore } from "store/auth";

const defaultValues = {};

type Props = {
  orderNo: string;
  router: NextRouter;
};

export const OrderDetail = ({ orderNo, router }: Props): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const { control, setValue, handleSubmit } = useForm<OrderFormType>();

  const today = new Date();

  const createdAt = toLocalDateTimeString(today);

  const { token } = AuthStore((state) => ({
    token: state.token,
  }));

  const onSubmit = (data: OrderFormType) => {
    const organizedData = {
      ...data,
      "card-public": true,
      "order-token": "porterma-2",
      "card-title": `${data["card-baby-name"]}-彌月卡`,
      "order-expired-at": new Date(data["order-expired-at"]).toJSON(),
      "card-baby-birthday": new Date(data["card-baby-birthday"]).toJSON(),
      "order-users-email": [data["email-1"] || "", data["email-2"] || ""],
    };
    delete organizedData["email-1"];
    delete organizedData["email-2"];

    const formData = new FormData();

    for (const name in organizedData) {
      formData.append(name, organizedData[name]);
    }

    postOrder(token, formData);
  };

  useEffect(() => {
    if (!orderNo) return;

    // Object.keys(defaultValues).forEach((val, _) =>
    //   setValue(val, defaultValues[val])
    // );
  }, [orderNo]);

  return (
    <form
      className=""
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold">
        {orderNo ? `訂單編號： ${orderNo}` : "建立訂單"}
      </h2>

      <div className="flex items-center my-4">
        <span className=" text-gray-500">訂單建立日期</span>
        <span className="mx-2">{createdAt}</span>
      </div>

      <div className="border rounded-lg shadow-lg py-4">
        <FormGroup title="開放寶寶卡片">
          <Form.Input type="switch" name="order-active" control={control} />
        </FormGroup>
        <FormGroup title="到期時間">
          <Form.Input
            type="date"
            name="order-expired-at"
            control={control}
            size="small"
            required
          />
        </FormGroup>

        {orderNo && (
          <div className="flex space-x-4 mt-8 px-8 pt-8 border-t">
            <Button.Basic
              type="button"
              className="bg-blue-500 text-white active:bg-blue-600"
            >
              <span>複製卡片連結</span>
            </Button.Basic>

            <Button.Basic
              type="button"
              className="bg-blue-500 text-white active:bg-blue-600"
            >
              <span>下載完整卡片</span>
            </Button.Basic>
          </div>
        )}

        <hr className="my-8" />

        <FormGroup title="訂單編號">
          <Form.Input
            type="text"
            name="order-no"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="填單人">
          <Form.Input
            type="text"
            name="order-author"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <div className="flex -my-4">
          <FormGroup title="聯絡人">
            <Form.Input
              type="text"
              name="order-contact"
              control={control}
              size="small"
              required
            />
          </FormGroup>
          <FormGroup title="" titleSpace="min-w-0">
            <Form.Input
              type="radio"
              label=""
              name="order-contact-gender"
              control={control}
              options={[
                { id: "female", value: "female", label: "女士" },
                { id: "male", value: "male", label: "先生" },
              ]}
              required
            />
          </FormGroup>
        </div>
        <FormGroup title="聯絡人手機">
          <Form.Input
            type="text"
            name="order-mobile"
            control={control}
            size="small"
            required
          />
        </FormGroup>

        <hr className="my-8" />

        <FormGroup title="爸爸名">
          <Form.Input
            type="text"
            name="card-father-name"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="媽媽名">
          <Form.Input
            type="text"
            name="card-mother-name"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="寶寶名">
          <Form.Input
            type="text"
            name="card-baby-name"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="寶寶出生日">
          <Form.Input
            type="date"
            name="card-baby-birthday"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="卡片說明" contentSpace="w-96">
          <Form.Input
            className="w-full"
            type="text"
            name="card-description"
            control={control}
            size="small"
            rows={2}
            required
          />
        </FormGroup>
        <FormGroup title="照片上傳">
          <input
            type="file"
            className="my-2"
            name="card-photo"
            accept="image/png, image/jpeg"
          />
        </FormGroup>
        <FormGroup title="選擇模板">
          <Form.Input
            className="w-1/2"
            type="select"
            name="card-template"
            options={[
              { id: "0", label: "預設模板", value: "0" },
              { id: "1", label: "模板1", value: "1" },
            ]}
            onChange={(e) => console.log(e)}
            control={control}
          />
        </FormGroup>

        <FormGroup title="開放前台留言">
          <Form.Input
            type="switch"
            name="card-comment-active"
            control={control}
          />
        </FormGroup>

        <hr className="my-8" />

        <FormGroup title="家長帳號1">
          <Form.Input
            type="text"
            name="email-1"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="家長帳號2">
          <Form.Input
            type="text"
            name="email-2"
            control={control}
            size="small"
          />
        </FormGroup>

        <hr className="my-8" />

        <div className="px-8 pb-4 flex justify-end space-x-4">
          <Button.Basic
            type="button"
            className="text-blue-500 bg-white"
            onClick={() =>
              showNotify("open", "尚未儲存訂單", "確定要返回列表頁？", () => {
                showNotify("close", "", "");
                router.back();
              })
            }
          >
            <span>返回</span>
          </Button.Basic>

          <Button.Basic
            type="submit"
            className="bg-blue-500 text-white active:bg-blue-600"
          >
            <span>{orderNo ? `儲存` : `新增`}</span>
          </Button.Basic>
        </div>
      </div>
    </form>
  );
};
