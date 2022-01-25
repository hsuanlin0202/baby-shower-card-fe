import { CircularProgress } from "@mui/material";
import { Button } from "components/elements";
import Form from "components/elements/form";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { LoginTypes } from "types";

type Props = {
  canLogin: boolean;
  control: Control<LoginTypes, object>;
  handleSubmit: UseFormHandleSubmit<LoginTypes>;
  onSubmit: (data: LoginTypes) => void;
};
export const LoginForm = ({
  canLogin,
  control,
  handleSubmit,
  onSubmit,
}: Props): JSX.Element => {
  if (!canLogin)
    return (
      <div className="py-10">
        <CircularProgress />
      </div>
    );

  return (
    <form
      className="w-full md:w-2/5 md:max-w-lg p-8 border rounded-md shadow-lg space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Input
        type="text"
        name="identifier"
        label="帳號"
        control={control}
        required
      />

      <Form.Input
        type="password"
        name="password"
        label="密碼"
        control={control}
        required
      />

      <Button.Basic
        type="submit"
        className="w-full p-4 bg-blue-500 text-white text-lg rounded"
      >
        登入
      </Button.Basic>
    </form>
  );
};
