import ClearIcon from "@mui/icons-material/Clear";
import { BabyCardTypes } from "types";
import Form from "components/elements/form";
import { useForm } from "react-hook-form";
import { getContrastColorByLightness } from "functions";
import { postMessages } from "api/messages";
import { NextRouter } from "next/router";
import { Modal } from "components/elements";

type Props = {
  isOpen: boolean;
  setOpen: (e: boolean) => void;
  card: BabyCardTypes;
  loadMessages: () => void;
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
  loadMessages,
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
          loadMessages();
          showNotify("close");
        },
        true
      );
    });
  };

  return (
    <Modal.ClearButton
      className="w-full max-w-none md:max-w-80 flex flex-col space-y-4"
      isOpen={isOpen}
      setOpen={setOpen}
    >
      <div>
        <h2 className="text-2xl text-gray-500 text-center mb-4 -mt-4">
          {card.babyName}，祝福你...
        </h2>
        <form className="mx-4" onSubmit={handleSubmit(onSubmit)}>
          <Form.Input
            className="w-full mb-4"
            type="text"
            name="content"
            control={control}
            rows={2}
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
              className="mx-auto px-10 py-3 text-base font-bold rounded-md bg-gray-500 text-white"
              onClick={() => setOpen(true)}
            >
              <span>送出祝福</span>
            </button>
          </div>
        </form>
      </div>
    </Modal.ClearButton>
  );
};
