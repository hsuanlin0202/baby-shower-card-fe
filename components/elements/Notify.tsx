import Modal from "@mui/material/Modal";

export type NotifyProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  title: string;
  message: string;
  action?: () => void;
  ariaTitle?: string;
  ariaDescription?: string;
};
export const Notify = ({
  isOpen,
  setOpen,
  title,
  message,
  action,
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
      <div className="w-screen h-screen flex justify-center items-center p-4">
        <div className="min-w-80 bg-white rounded-lg">
          <div className="">
            {!!title && (
              <div className="p-4 border-b border-gray-300">{title}</div>
            )}
            <div className="p-4">{message}</div>
          </div>

          <div className="w-full p-4 flex justify-end">
            <button
              type="button"
              className=" px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                if (!action) {
                  setOpen(false);
                  return;
                }

                action();
              }}
            >
              <span>確定</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
