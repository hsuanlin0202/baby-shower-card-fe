// @ts-noch-eck
import { useEffect, useState } from "react";
import { NextRouter } from "next/router";
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Modal } from "@mui/material";
import Form from "components/elements/form";
import { Button, ImageUpload } from "components/elements";
import { OrderFormType } from "types";
import {
  organizeFormData,
  postErrorCode,
  Rule,
  toLocalDateTimeString,
} from "functions";
import { FormGroup } from "./FormGroup";
import { useInitData } from "hooks";
import { getOrder, postOrder, putOrder } from "api/order";
import { AuthStore } from "store/auth";

const setValueList: Array<keyof OrderFormType> = [
  "order-author",
  "order-contact",
  "order-contact-gender",
  "order-mobile",
  "order-active",
  "order-expired-at",
  "card-title",
  "card-description",
  "card-template",
  "card-comment-active",
  "card-father-name",
  "card-mother-name",
  "card-baby-name",
  "card-baby-birthday",
  "card-public",
  "email-1",
  "email-2",
];

type Props = {
  orderId: string;
  router: NextRouter;
};

export const OrderDetail = ({ orderId, router }: Props): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const { control, setValue, handleSubmit } = useForm<OrderFormType>();

  const today = new Date();

  const [order, setOrder] = useState<OrderFormType>(null);

  const [createdAt, setCreatedAt] = useState<string>(
    toLocalDateTimeString(today)
  );

  const [photo, setPhoto] = useState<string | ArrayBuffer>("");

  const [photoError, setPhotoError] = useState<boolean>(false);

  const [openImgModal, setImgModal] = useState<boolean>(false);

  const [uploadImg, setUploadImg] = useState<Blob>(null);

  const { token } = AuthStore((state) => ({
    token: state.token,
  }));
  const onSubmit = (data: OrderFormType) => {
    if (!orderId) {
      postNewOrder(data);
      return;
    }

    editOrder({ ...data, "order-no": order["order-no"] }, parseInt(orderId));
  };

  const editOrder = (data: OrderFormType, id: number) => {
    const formData = organizeFormData("edit", data, uploadImg);
    openLoader(true);

    putOrder(token, id, formData)
      .then((result) => {
        openLoader(false);
        if (!result.id) {
          showNotify("open", "無法更新訂單", "請稍後再試。");
          return;
        }

        showNotify("open", "", "訂單更新成功");
      })
      .catch(() => {
        openLoader(false);
        showNotify("open", "連線逾時", "請稍候再試一次。");
      });
  };

  const postNewOrder = (data: OrderFormType) => {
    if (!order && !uploadImg) {
      setPhotoError(true);
      return;
    }
    const formData = organizeFormData("add", data, uploadImg);

    openLoader(true);
    postOrder(token, formData)
      .then((result) => {
        openLoader(false);
        if (!result.id) {
          const message = postErrorCode(result.message);
          showNotify("open", "無法新增訂單", message);
          return;
        }
        router.replace(`/vendor/order/${result.id}`);
      })
      .catch(() => {
        openLoader(false);
        showNotify("open", "連線逾時", "請稍候再試一次。");
      });
  };

  useEffect(() => {
    if (!orderId || !!order) return;

    openLoader(true);
    getOrder(token, orderId).then((result) => {
      openLoader(false);
      if (!result) {
        showNotify("open", "找不到訂單", "請再試一次", () => {
          showNotify("close", "", "");
          router.replace("/vendor/order");
        });
        return;
      }

      setValueList.forEach((key) => {
        setValue(key, result[key]);
      });

      setOrder(result);
      setPhoto(result["card-photo"]);
      setCreatedAt(toLocalDateTimeString(new Date(result["order-created-at"])));
    });
  }, [orderId]);

  useEffect(() => {
    if (!uploadImg) return;
    setPhotoError(false);
    const image = new FileReader();
    image.onload = (e) => {
      setPhoto(e.target.result);
    };
    image.readAsDataURL(uploadImg);
  }, [uploadImg]);

  return (
    <form
      className=""
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <Modal open={openImgModal} onClose={setImgModal}>
        <div className="w-screen h-screen flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-60p rounded-lg">
            <ImageUpload
              setOpen={(open) => setImgModal(open)}
              setFile={(file) => {
                setUploadImg(file);
                setImgModal(false);
              }}
            />
          </div>
        </div>
      </Modal>

      <div className="flex mb-4">
        <h2 className="text-2xl font-bold">
          {!!order
            ? `訂單編號： ${
                order["order-no"].indexOf("?") === -1
                  ? order["order-no"]
                  : order["order-no"].substring(
                      0,
                      order["order-no"].indexOf("?")
                    )
              }`
            : "建立訂單"}
        </h2>
        {!orderId && (
          <div className="max-w-36 ml-4">
            <Form.Input
              type="text"
              label="Token"
              name="order-token"
              control={control}
              size="small"
              required
            />
          </div>
        )}
      </div>

      {!!order && (
        <div className="flex items-center mb-4">
          <span className=" text-gray-500">訂單建立日期</span>
          <span className="mx-2">{createdAt}</span>
        </div>
      )}

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
            min={new Date()}
          />
        </FormGroup>

        {orderId && (
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

        {!orderId && (
          <FormGroup title="訂單編號">
            <Form.Input
              type="text"
              name="order-no"
              control={control}
              size="small"
              required
            />
          </FormGroup>
        )}

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
            pattern={Rule.Phone}
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
          {photo && (
            <div className="flex">
              <img
                src={photo as string}
                className="w-20 border border-gray-300 mr-2"
              />
              <button
                className="mx-2 text-gray-400 hover:text-black"
                type="button"
                onClick={() => setImgModal(true)}
              >
                更換照片
              </button>
            </div>
          )}

          {!photo && (
            <Button.Basic
              type="button"
              className="border border-gray-400 hover:border-black text-gray-400 hover:text-black"
              icon={<AddCircleOutlineIcon />}
              onClick={() => setImgModal(true)}
            >
              <span>上傳照片</span>
            </Button.Basic>
          )}
          {photoError && (
            <span className="text-xs text-red-600">請選擇照片</span>
          )}
        </FormGroup>
        <FormGroup title="選擇模板">
          <Form.Input
            className="w-1/2"
            type="select"
            name="card-template"
            options={[
              { id: "1", label: "藍色東京", value: "1" },
              { id: "2", label: "粉色巴黎", value: "2" },
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

        <FormGroup title="家長Email - 1">
          <Form.Input
            type="text"
            name="email-1"
            control={control}
            size="small"
            required
            pattern={Rule.Email}
            errorMsg="請確認Email格式"
          />
        </FormGroup>
        <FormGroup title="家長Email - 2">
          <Form.Input
            type="text"
            name="email-2"
            control={control}
            size="small"
            pattern={Rule.Email}
            errorMsg="請確認Email格式"
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
            <span>{orderId ? `儲存` : `新增`}</span>
          </Button.Basic>
        </div>
      </div>
    </form>
  );
};
