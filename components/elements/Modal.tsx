import { ReactNode } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import MUIModal from "@mui/material/Modal";
import clsx from "clsx";

type Props = {
  className?: string;
  isOpen: boolean;
  setOpen: (e: boolean) => void;
  children: ReactNode;
  backgroundClose?: boolean;
};
const Base = ({
  isOpen,
  setOpen,
  children,
  backgroundClose = false,
}: Props) => {
  return (
    <MUIModal open={isOpen} onClose={setOpen}>
      <div
        className="w-screen h-screen flex justify-center items-center p-2 md:p-4 -mt-20 md:m-0"
        onClick={() => {
          if (!backgroundClose) return;
          setOpen(false);
        }}
      >
        {children}
      </div>
    </MUIModal>
  );
};

const ClearButton = ({
  className,
  isOpen,
  setOpen,
  children,
  backgroundClose = false,
}: Props) => {
  return (
    <MUIModal open={isOpen} onClose={setOpen}>
      <div
        className="w-screen h-screen flex justify-center items-center p-2 md:p-4 -mt-20 md:m-0"
        onClick={() => {
          if (!backgroundClose) return;
          setOpen(false);
        }}
      >
        <div className={clsx("p-2 bg-white rounded-lg", className)}>
          <div className="w-full flex justify-end mb-4">
            <button type="button" onClick={() => setOpen(false)}>
              <span className="text-gray-600">
                <ClearIcon />
              </span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </MUIModal>
  );
};

export const Modal = { Base, ClearButton };
