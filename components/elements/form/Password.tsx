import React, { useState, useCallback } from "react";
import { Controller } from "react-hook-form";
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import clsx from "clsx";
import { CommonProps } from "./types";

export type PasswordProps<T> = CommonProps<T> & {
  type: "password";
};
export const Password = <T,>({
  className,
  type,
  name,
  label,
  icon,
  control,
  required,
  pattern,
  ...props
}: PasswordProps<T>): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setVisible(!visible)}
        edge="end"
      >
        <span className="w-4 mr-4">
          {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </span>
      </IconButton>
    </InputAdornment>
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required, pattern }}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <FormControl
          variant="outlined"
          className={clsx("w-full", className)}
          error={Boolean(error)}
          required={required}
          {...{ onChange, onBlur, value }}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>

          <OutlinedInput
            id={name}
            label={label}
            type={visible ? "text" : "password"}
            startAdornment={icon && <span className="w-4 mr-2">{icon}</span>}
            endAdornment={endAdornment}
            inputProps={props}
            inputRef={ref}
          />
        </FormControl>
      )}
    />
  );
};
