import React from "react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { CommonProps } from "./types";

export type TextProps<T> = CommonProps<T> & {
  type: "text";
  size?: "small" | "medium";
  rows?: number;
  errorMsg?: string;
  placeholder?: string;
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
  rows = 1,
  pattern,
  errorMsg,
  placeholder = "",
  ...props
}: TextProps<T>): JSX.Element => {
  const parseLines = (value): string => value.replace(/(\\n)/g, "\n");

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required, pattern: pattern || undefined }}
      render={({
        field: { value, onChange, name, ref },
        fieldState: { error },
      }) => (
        <div className={className}>
          <TextField
            id={name}
            label={label ? label : undefined}
            className={"w-full"}
            variant="outlined"
            value={parseLines(value || "")}
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
            rows={rows}
            multiline={rows > 1}
            placeholder={placeholder}
          />
          {Boolean(error) && (
            <p className="text-xs text-red-600">
              {required && !value ? "此欄位為必填" : errorMsg}
            </p>
          )}
        </div>
      )}
    />
  );
};
