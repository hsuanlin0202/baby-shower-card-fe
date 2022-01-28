import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio as _Radio,
} from "@mui/material";
import {
  Controller,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import { CommonProps } from "./types";

export type RadioProps<T> = CommonProps<T> & {
  type: "radio";
  options: { id: string; label: string; value: string }[];
};
export const Radio = <T,>({
  name,
  label,
  options,
  control,
  required,
}: RadioProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue={
        options[0].value as UnpackNestedValue<PathValue<T, Path<T>>>
      }
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>

          <RadioGroup aria-label={label} row {...field}>
            {options.map(({ id, label, value }) => (
              <FormControlLabel
                key={id}
                value={value}
                control={<_Radio color="primary" />}
                label={label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};
