import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import _clsx from "clsx";

type BackButtonProps = {
  onClick: () => void;
};
export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button type="button" onClick={() => onClick()}>
      <span className="w-4 mr-5">
        <ArrowBackIosIcon />
      </span>
    </button>
  );
}
