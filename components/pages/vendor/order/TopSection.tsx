import { Button } from "components/elements";
import Form from "components/elements/form";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  pushPage: (path: string) => void;
  onSubmit: (data: { keyword: string }) => void;
};
export const TopSection = ({ pushPage, onSubmit }: Props): JSX.Element => {
  const { control, handleSubmit } = useForm<{ keyword: string }>();

  return (
    <div className="pb-4 flex justify-between items-center border-b border-gray-300">
      <Button.Basic
        type="button"
        className="bg-red-500 text-white active:bg-red-600 leading-4 pl-2"
        icon={<AddIcon fontSize="small" />}
        onClick={() => pushPage("new")}
      >
        <span>新增</span>
      </Button.Basic>

      <form className="w-1/2 flex space-x-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          type="text"
          name="keyword"
          control={control}
          label="搜尋"
          size="small"
        />

        <Button.Basic
          type="submit"
          className="bg-blue-500 text-white active:bg-blue-600"
        >
          <span>搜尋</span>
        </Button.Basic>
      </form>
    </div>
  );
};
