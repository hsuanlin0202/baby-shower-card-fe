// @ts-nocheck
import { useForm } from "react-hook-form";
import Form from "components/elements/form";
import { Button } from "components/elements";
import { CardTypes, OrderTypes } from "types";
import { toLocalDateTimeString } from "functions";
import { FormGroup } from "./FormGroup";
import { useEffect } from "react";
import { useInitData } from "hooks";
import { NextRouter } from "next/router";

const defaultValues = {
  createdAt: new Date().toISOString(),
  author: "author",
  orderNo: "Porter-001",
  contact: "波特媽",
  contactGender: "male",
  mobile: "0987789999",
  active: true,
  expiredAt: "2022-05-01",
  title: "??",
  description: "description",
  commentActive: true,
  fatherName: "father",
  motherName: "mother",
  babyName: "baby",
  babyBirthday: "2022-03-18",
  photo: "",
  template: 0,
  parentEmail1: "test1@baby.com",
  parentEmail2: "test2@baby.com",
};

type Props = {
  orderNo: string;
  router: NextRouter;
};

export const OrderDetail = ({ orderNo, router }: Props): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const { control, setValue, handleSubmit } = useForm<OrderTypes & CardTypes>();

  const today = new Date();

  const createdAt = toLocalDateTimeString(today);

  const onSubmit = (data: OrderTypes & CardTypes) => {
    const organizedData = {
      order: {
        orderNo: data.orderNo,
        author: data.author,
        contact: data.contact,
        contactGender: data.contactGender,
        mobile: data.mobile,
        active: true,
        expiredAt: new Date(data.expiredAt).toJSON(),
        createdAt: data.createdAt
          ? new Date(data.createdAt).toJSON()
          : today.toJSON(),
      },
      card: {
        title: `${data.babyName}_彌月卡片`,
        description: data.description,
        commentActive: data.commentActive,
        fatherName: data.fatherName,
        motherName: data.motherName,
        babyName: data.babyName,
        babyBirthday: new Date(data.babyBirthday).toJSON(),
        createdAt: data.createdAt
          ? new Date(data.createdAt).toJSON()
          : today.toJSON(),
        updatedAt: new Date().toJSON(),
        closeAt: new Date(data.expiredAt).toJSON(),
      },
    };
    console.log(organizedData);
  };

  useEffect(() => {
    if (!orderNo) return;

    Object.keys(defaultValues).forEach((val, _) =>
      setValue(val, defaultValues[val])
    );
  }, [orderNo]);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">
        {orderNo ? `訂單編號： ${orderNo}` : "建立訂單"}
      </h2>

      <div className="flex items-center my-4">
        <span className=" text-gray-500">訂單建立日期</span>
        <span className="mx-2">{createdAt}</span>
      </div>

      <div className="border rounded-lg shadow-lg py-4">
        <FormGroup title="開放寶寶卡片">
          <Form.Input type="switch" name="active" control={control} />
        </FormGroup>
        <FormGroup title="到期時間">
          <Form.Input
            type="date"
            name="expiredAt"
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
            name="orderNo"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="填單人">
          <Form.Input
            type="text"
            name="author"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <div className="flex -my-4">
          <FormGroup title="聯絡人">
            <Form.Input
              type="text"
              name="contact"
              control={control}
              size="small"
              required
            />
          </FormGroup>
          <FormGroup title="" titleSpace="min-w-0">
            <Form.Input
              type="radio"
              label=""
              name="contactGender"
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
            name="mobile"
            control={control}
            size="small"
            required
          />
        </FormGroup>

        <hr className="my-8" />

        <FormGroup title="爸爸名">
          <Form.Input
            type="text"
            name="fatherName"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="媽媽名">
          <Form.Input
            type="text"
            name="motherName"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="寶寶名">
          <Form.Input
            type="text"
            name="babyName"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="寶寶出生日">
          <Form.Input
            type="date"
            name="babyBirthday"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="卡片說明" contentSpace="w-96">
          <Form.Input
            className="w-full"
            type="text"
            name="description"
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
            id="babyImg"
            name="babyImg"
            accept="image/png, image/jpeg"
          />
        </FormGroup>
        <FormGroup title="選擇模板">
          <Form.Input
            className="w-1/2"
            type="select"
            name="template"
            options={[]}
            onChange={(e) => console.log(e)}
            control={control}
          />
        </FormGroup>

        <FormGroup title="開放前台留言">
          <Form.Input type="switch" name="commentActive" control={control} />
        </FormGroup>

        <hr className="my-8" />

        <FormGroup title="家長帳號1">
          <Form.Input
            type="text"
            name="parentEmail1"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="家長帳號2">
          <Form.Input
            type="text"
            name="parentEmail2"
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
