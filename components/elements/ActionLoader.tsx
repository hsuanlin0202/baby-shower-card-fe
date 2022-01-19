import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  className?: string;
  isOpen?: boolean;
};

const Action = ({ isOpen }: Props): JSX.Element => {
  if (!isOpen) return <></>;

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-black bg-opacity-20 shadow-2xl z-100">
      <div className="bg-white p-4 rounded-lg">
        <CircularProgress />
      </div>
    </div>
  );
};

const Base = ({ className }: Props): JSX.Element => {
  return (
    <div className={className}>
      <CircularProgress />
    </div>
  );
};

export const Loader = { Base, Action };