import Modal from "@mui/material/Modal";
import { Button } from "./Button";

export type NotifyProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  title: string;
  message: string;
  action?: () => void;
  force: boolean;
  ariaTitle?: string;
  ariaDescription?: string;
};
export const Notify = ({
  isOpen,
  setOpen,
  title,
  message,
  action,
  force,
  ariaTitle = "modal-title",
  ariaDescription = "model-description",
}: NotifyProps): JSX.Element => {
  return (
    <Modal
      open={isOpen}
      onClose={setOpen}
      aria-labelledby={ariaTitle}
      aria-describedby={ariaDescription}
    >
      <div className="w-screen h-screen flex justify-center items-center p-4 -mt-20 md:m-0">
        <div className="min-w-80 bg-white rounded-lg">
          <div className="">
            {!!title && (
              <div className="p-4 border-b border-gray-300">{title}</div>
            )}
            <div className="p-4">{message}</div>
          </div>

          <div className="w-full p-4 flex justify-end space-x-2">
            {!!action && !force && (
              <Button.Basic
                type="button"
                className=" text-blue-cis border border-blue-cis"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <span>取消</span>
              </Button.Basic>
            )}

            <Button.Basic
              type="button"
              className="bg-blue-cis text-white"
              onClick={() => {
                if (!action) {
                  setOpen(false);
                  return;
                }

                action();
              }}
            >
              <span>確定</span>
            </Button.Basic>
          </div>
        </div>
      </div>
    </Modal>
  );
};
