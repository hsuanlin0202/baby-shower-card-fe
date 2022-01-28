import TextField from "@mui/material/TextField";
import {
  Controller,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import { CommonProps } from "./types";
import clsx from "clsx";
import { format } from "date-fns";

type DateType = "year" | "month" | "date";
type Props<T> = CommonProps<T> & {
  type: DateType;
  min?: Date;
  max?: Date;
  value?: Date;
  size?: "small" | "medium";
};
function Base<T>({
  type,
  name,
  label,
  required,
  control,
  className,
  value,
  min,
  max,
  size = "medium",
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue={
        value &&
        (format(value, "yyyy-MM-dd") as UnpackNestedValue<
          PathValue<T, Path<T>>
        >)
      }
      render={({
        field: { value, onChange, name, ref },
        fieldState: { error },
      }) => (
        <TextField
          type={type}
          id={name}
          name={name}
          variant="outlined"
          label={label}
          InputLabelProps={{
            shrink: true,
          }}
          error={Boolean(error)}
          inputRef={ref}
          value={value}
          onChange={onChange}
          required={required}
          className={clsx("w-full", className)}
          inputProps={{
            min: min && format(min, "yyyy-MM-dd"),
            max: max && format(max, "yyyy-MM-dd"),
          }}
          size={size}
        />
      )}
    />
  );
}

export type DatePickerProps<T> = Props<T> & {
  type: "date";
};
export function DatePicker<T>({ type, ...props }: DatePickerProps<T>) {
  return <Base type="date" {...props} />;
}
