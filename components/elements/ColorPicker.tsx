import { useState } from "react";
import { ChromePicker } from "react-color";
import ClearIcon from "@mui/icons-material/Clear";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {
  color: string;
  setColor: (color: string) => void;
};
export const ColorPicker = ({ color, setColor }: Props): JSX.Element => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex items-center border border-gray-400 rounded-sm p-1 bg-gray-100"
          onClick={handleClick}
        >
          <div className="w-14 h-5" style={{ background: color }}></div>
          {/* {!displayColorPicker && (
            <span className="text-gray-500 ml-1 w-5 h-5 block leading-5">
              <KeyboardArrowDownIcon fontSize="small" />
            </span>
          )} */}
        </button>
      </div>

      {displayColorPicker ? (
        <div className="absolute flex flex-col items-end ml-20 -mt-24 z-20">
          <div
            className="fixed w-screen h-screen top-0 left-0"
            onClick={handleClose}
          />

          <button type="button" onClick={handleClose}>
            <span className="pb-2 text-gray-400">
              <ClearIcon fontSize="small" />
            </span>
          </button>

          <ChromePicker
            color={color}
            onChange={(color) => setColor(color.hex)}
            disableAlpha
          />
        </div>
      ) : null}
    </div>
  );
};
