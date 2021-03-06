// @ts-nocheck
import { useEffect, useState } from "react";
import { NextRouter } from "next/router";
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Form from "components/elements/form";
import { Button, ImageUpload, Modal } from "components/elements";
import { OrderFormType } from "types";
import { Option } from "components/elements/form/types";
import {
  forceBackToOrderNotify,
  getUsableTokens,
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

  const [templates, setTemplates] = useState<Option[]>([]);

  const [orderTokens, setOrderTokens] = useState<Option[]>([]);

  const { token, orderTokenList, templateList } = AuthStore((state) => ({
    token: state.token,
    orderTokenList: state.orderTokens,
    templateList: state.templates,
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
          showNotify("open", "??????????????????", "??????????????????");
          return;
        }

        showNotify("open", "", "??????????????????");
      })
      .catch(() => {
        openLoader(false);
        showNotify("open", "????????????", "????????????????????????");
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
          showNotify("open", "??????????????????", message);
          return;
        }
        router.replace(`/vendor/order/${result.id}`);
      })
      .catch(() => {
        openLoader(false);
        showNotify("open", "????????????", "????????????????????????");
      });
  };

  useEffect(() => {
    if (!orderId) {
      // get usable tokens
      const usableTokens = getUsableTokens(orderTokenList);

      if (usableTokens.length === 0) {
        forceBackToOrderNotify(
          showNotify,
          "????????????????????????",
          "??????????????????????????????",
          router
        );
        return;
      }

      setOrderTokens(
        usableTokens.map((token, index) => {
          return { id: index.toString(), label: token, value: token };
        })
      );
      return;
    }

    if (!!order) return;

    openLoader(true);

    getOrder(token, orderId).then((result) => {
      openLoader(false);
      if (!result) {
        forceBackToOrderNotify(showNotify, "???????????????", "???????????????", router);
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
    if (templateList.length === 0) return;

    setTemplates(
      templateList.map((template, index) => {
        return { id: index, label: template.name, value: template.id };
      })
    );
  }, [templateList]);

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
      <Modal.Base isOpen={openImgModal} setOpen={setImgModal}>
        <div className="bg-white w-full max-w-60p rounded-lg">
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

      <div className="flex mb-4">
        <h2 className="text-2xl font-bold">
          {!!order
            ? `??????????????? ${
                order["order-no"].indexOf("?") === -1
                  ? order["order-no"]
                  : order["order-no"].substring(
                      0,
                      order["order-no"].indexOf("?")
                    )
              }`
            : "????????????"}
        </h2>
        {!orderId && (
          <div className="ml-4">
            <Form.Input
              type="select"
              label="????????????"
              name="order-token"
              options={orderTokens}
              control={control}
              required
            />
          </div>
        )}
      </div>

      {!!order && (
        <div className="flex items-center mb-4">
          <span className=" text-gray-500">??????????????????</span>
          <span className="mx-2">{createdAt}</span>
        </div>
      )}

      <div className="border rounded-lg shadow-lg py-4">
        <FormGroup title="??????????????????">
          <Form.Input type="switch" name="order-active" control={control} />
        </FormGroup>

        <FormGroup title="????????????">
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
            <Button.Basic type="button" className="bg-orange-cis text-white">
              <span>??????????????????</span>
            </Button.Basic>

            <Button.Basic type="button" className="bg-orange-cis text-white">
              <span>??????????????????</span>
            </Button.Basic>
          </div>
        )}

        <hr className="my-8" />

        {!orderId && (
          <FormGroup title="????????????">
            <Form.Input
              type="text"
              name="order-no"
              control={control}
              size="small"
              required
            />
          </FormGroup>
        )}

        <FormGroup title="?????????">
          <Form.Input
            type="text"
            name="order-author"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <div className="flex flex-col md:flex-row -my-4">
          <FormGroup title="?????????">
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
                { id: "female", value: "female", label: "??????" },
                { id: "male", value: "male", label: "??????" },
              ]}
              required
            />
          </FormGroup>
        </div>
        <FormGroup title="???????????????">
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

        <FormGroup title="?????????">
          <Form.Input
            type="text"
            name="card-father-name"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="?????????">
          <Form.Input
            type="text"
            name="card-mother-name"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="?????????">
          <Form.Input
            type="text"
            name="card-baby-name"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="???????????????">
          <Form.Input
            type="date"
            name="card-baby-birthday"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="????????????" contentSpace="w-96">
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
        <FormGroup title="????????????">
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
                ????????????
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
              <span>????????????</span>
            </Button.Basic>
          )}
          {photoError && (
            <span className="text-xs text-red-600">???????????????</span>
          )}
        </FormGroup>
        <FormGroup title="????????????">
          <Form.Input
            className="w-1/2"
            type="select"
            name="card-template"
            options={templates}
            onChange={(e) => console.log(e)}
            control={control}
          />
        </FormGroup>

        <FormGroup title="??????????????????">
          <Form.Input
            type="switch"
            name="card-comment-active"
            control={control}
          />
        </FormGroup>

        <hr className="my-8" />

        <FormGroup title="??????Email - 1">
          <Form.Input
            type="text"
            name="email-1"
            control={control}
            size="small"
            required
            pattern={Rule.Email}
            errorMsg="?????????Email??????"
          />
        </FormGroup>
        <FormGroup title="??????Email - 2">
          <Form.Input
            type="text"
            name="email-2"
            control={control}
            size="small"
            pattern={Rule.Email}
            errorMsg="?????????Email??????"
          />
        </FormGroup>

        <hr className="my-8" />

        <div className="px-8 pb-4 flex justify-end space-x-4">
          <Button.Basic
            type="button"
            className="text-blue-cis border border-blue-cis bg-white"
            onClick={() =>
              showNotify("open", "??????????????????", "???????????????????????????", () => {
                showNotify("close");
                router.back();
              })
            }
          >
            <span>??????</span>
          </Button.Basic>

          <Button.Basic type="submit" className="bg-blue-cis text-white">
            <span>{orderId ? `??????` : `??????`}</span>
          </Button.Basic>
        </div>
      </div>
    </form>
  );
};
