import Form from "components/elements/form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  active: boolean;
  showNotify: (
    type: "open" | "close",
    title?: string,
    message?: string,
    action?: () => void,
    force?: boolean
  ) => void;
};

export const StatusControl = ({ active, showNotify }: Props): JSX.Element => {
  const { control, setValue, handleSubmit, watch } =
    useForm<{ "card-comment-active": boolean }>();

  useEffect(() => {
    setValue("card-comment-active", active);
  }, [active]);

  useEffect(() => {
    const subscription = watch((value) =>
      PutStatus(value["card-comment-active"])
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const PutStatus = (newStatus: boolean) => {
    // 先打api
    showNotify(
      "open",
      `留言功能已${newStatus ? "開啟" : "關閉"}`,
      `寶寶的卡片已${newStatus ? "開放" : "關閉"}留言功能。訪客${
        newStatus ? "可以" : "無法"
      }留言，也${newStatus ? "看得到" : "看不到"}其他留言。`
    );
  };

  return (
    <div className="w-full flex items-center justify-center md:justify-start mb-8">
      <span className="text-lg">{`開放留言功能`}</span>
      <Form.Input type="switch" name="card-comment-active" control={control} />
    </div>
  );
};
