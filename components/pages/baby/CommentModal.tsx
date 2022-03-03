import { Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { BabyCardTypes } from "types";
import Form from "components/elements/form";
import { useForm } from "react-hook-form";
import { getContrastColorByLightness } from "functions";
import { postMessages } from "api/messages";
import { NextRouter } from "next/router";

type Props = {
  isOpen: boolean;
  setOpen: (e: boolean) => void;
  card: BabyCardTypes;
  router: NextRouter;
  showNotify: (
    type: "open" | "close",
    title?: string,
    message?: string,
    action?: () => void,
    force?: boolean
  ) => void;
};

type FormTypes = {
  author: string;
  content: string;
};

export const CommentModal = ({
  isOpen,
  setOpen,
  card,
  router,
  showNotify,
}: Props): JSX.Element => {
  const { control, handleSubmit } = useForm<FormTypes>();

  const onSubmit = (data: FormTypes): void => {
    postMessages({ ...data, cardId: card.id }).then((result) => {
      console.log(result);
      if (!result) {
        showNotify("open", "Oops!", "祝褔未送出，請再試一次。");
        return;
      }
      setOpen(false);
      showNotify(
        "open",
        "已送出",
        "已將您的祝福送出。",
        () => {
          router.reload();
        },
        true
      );
    });
  };

  return (
    <Modal open={isOpen} onClose={setOpen}>
      <div className="w-screen h-screen flex justify-center items-center p-2 md:p-4">
        <style jsx>
          {`
            .textColor {
              color: ${card.template.textColor};
            }
            .colored-background {
              background-color: ${card.template.textColor};
              color: ${getContrastColorByLightness(card.template.textColor)};
            }
          `}
        </style>
        <div className="w-full max-w-none md:max-w-80 p-2 flex flex-col bg-white rounded-lg space-y-4">
          <div className="text-right">
            <button type="button" onClick={() => setOpen(false)}>
              <span>
                <ClearIcon />
              </span>
            </button>
          </div>

          <h2 className="text-2xl textColor text-center">
            {card.babyName}，祝福你...
          </h2>
          <form className="mx-4" onSubmit={handleSubmit(onSubmit)}>
            <Form.Input
              className="w-full mb-4"
              type="text"
              name="content"
              control={control}
              rows={3}
              required
              placeholder="請輸入祝福的話*"
            />

            <Form.Input
              label=""
              className="w-full"
              type="text"
              name="author"
              control={control}
              required
              size="small"
              placeholder="請輸入您的名字*"
            />

            <div className="w-full flex justify-center mt-8 mb-6">
              <button
                type="submit"
                className="mx-auto px-10 py-2 text-sm rounded-md colored-background"
                onClick={() => setOpen(true)}
              >
                <span>送出祝福</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
