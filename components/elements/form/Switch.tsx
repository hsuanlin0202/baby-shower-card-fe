import React from "react";
import { FormControl, FormLabel, Switch as _Switch } from "@mui/material";
import {
  Controller,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import { CommonProps } from "./types";

export type SwitchProps<T> = CommonProps<T> & {
  type: "switch";
  checked?: boolean;
};
export const Switch = <T,>({
  name,
  label,
  control,
  required,
  checked,
}: SwitchProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue={checked as UnpackNestedValue<PathValue<T, Path<T>>>}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          <FormLabel component="legend" required={required}>
            {label}
          </FormLabel>

          <_Switch
            name={name}
            checked={field.value as boolean}
            aria-label={label}
            {...field}
          />
        </FormControl>
      )}
    />
  );
};
