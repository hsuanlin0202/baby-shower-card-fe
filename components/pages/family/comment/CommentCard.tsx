import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { MessageTypes } from "types";

type Props = {
  message: MessageTypes;
  showNotify: (
    type: "open" | "close",
    title?: string,
    message?: string,
    action?: () => void,
    force?: boolean
  ) => void;
};

export const CommentCard = ({ message, showNotify }: Props): JSX.Element => {
  const PutStatus = (newStatus: boolean) => {
    // 先打api
  };

  return (
    <div
      className="rounded-lg shadow-md mb-8 md:mb-4"
      style={{ breakInside: "avoid" }}
    >
      <div className="px-4 py-2 flex items-center justify-between bg-brown-cis text-white rounded-t-lg">
        <span>{message.author}</span>
        <button type="button" onClick={() => PutStatus(message.public)}>
          <span>
            {message.public ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
        </button>
      </div>
      <div className="p-4 bg-brown-50 text-brown-cis rounded-b-lg">
        {message.content}
      </div>
    </div>
  );
};
