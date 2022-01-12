import * as React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CommonProps } from "./types";
import { Controller } from "react-hook-form";

export type CheckProps<T> = CommonProps<T> & {
  type: "check";
  checked?: boolean;
};
export const Check = <T,>({
  name,
  label,
  checked,
  disabled,
  control,
  required,
}: CheckProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, name, ref }, fieldState: { error } }) => (
        <FormControlLabel
          control={<Checkbox checked={checked} />}
          label={label || ""}
          name={name}
          onChange={onChange}
          inputRef={ref}
          disabled={disabled}
        />
      )}
    />
  );
};
