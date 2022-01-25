import React from "react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { CommonProps } from "./types";

export type TextProps<T> = CommonProps<T> & {
  type: "text";
  size?: "small" | "medium";
  headLabel?: boolean;
};
export const Text = <T,>({
  className,
  type,
  name,
  label,
  icon,
  control,
  required,
  disabled,
  size = "medium",
  headLabel = false,
  ...props
}: TextProps<T>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, name, ref }, fieldState: { error } }) => (
        <TextField
          id={name}
          label={label ? label : undefined}
          className={clsx("w-full", className)}
          variant="outlined"
          InputProps={{
            startAdornment: icon && <span className="w-4 mr-2">{icon}</span>,
            ...props,
          }}
          error={Boolean(error)}
          inputRef={ref}
          onChange={onChange}
          required={required}
          disabled={disabled}
          size={size}
        />
      )}
    />
  );
};
