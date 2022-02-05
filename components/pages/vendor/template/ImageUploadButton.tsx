import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
  isSelected: boolean;
  imgPath: string;
  htmlFor: string;
};

export const ImageUploadButton = ({
  isSelected,
  imgPath,
  htmlFor,
}: Props): JSX.Element => {
  return (
    <>
      {isSelected && (
        <label
          className="relative border border-gray-300 bg-black flex items-center justify-center cursor-pointer"
          htmlFor={htmlFor}
        >
          <img className="w-56 hover:opacity-40 z-10 bg-white" src={imgPath} />
          <div className="absolute text-white z-0">重選圖片</div>
        </label>
      )}
      {!isSelected && (
        <label
          className="w-36 flex justify-center items-center p-2 border border-gray-500 text-gray-500 hover:bg-gray-100 cursor-pointer rounded-md"
          htmlFor={htmlFor}
        >
          <AddCircleOutlineIcon className="mr-2" />
          <span>上傳圖片</span>
        </label>
      )}
    </>
  );
};
