import React from "react";
import { FormControl, Select as _Select, MenuItem } from "@mui/material";
import {
  Controller,
  Path,
  PathValue,
  UnpackNestedValue,
} from "react-hook-form";
import { CommonProps, Option } from "./types";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export type SelectProps<T> = CommonProps<T> & {
  type: "select";
  options: Option[];
  onChange?: (value: string) => void;
};
export function Select<T>({
  name,
  control,
  required,
  label,
  options,
  className = "",
  onChange = (event) => {},
}: SelectProps<T>) {
  return (
    <div className={clsx("w-full flex items-center space-x-2", className)}>
      {!!label && <p className=" whitespace-nowrap">{label}</p>}

      {!control && (
        <FormControl variant="outlined" fullWidth required={required}>
          <_Select
            native
            label={label}
            required={required}
            input={<BootstrapInput />}
            inputProps={{
              name,
              id: name,
            }}
            onChange={(event) => onChange(event.target.value as string)}
          >
            {options.map(({ id, value, label }) => (
              <option key={id} value={value}>
                {label}
              </option>
            ))}
          </_Select>
        </FormControl>
      )}

      {!!control && (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          defaultValue={
            options[0].value as UnpackNestedValue<PathValue<T, Path<T>>>
          }
          render={({ field, fieldState: { error } }) => {
            return (
              <FormControl variant="outlined" fullWidth required={required}>
                <_Select
                  label={label}
                  required={required}
                  input={<BootstrapInput />}
                  inputProps={{
                    name,
                    id: name,
                  }}
                  value={field.value || options[0].value}
                  {...field}
                >
                  {options.map(({ id, value, label }) => (
                    <MenuItem key={id} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </_Select>
              </FormControl>
            );
          }}
        />
      )}
    </div>
  );
}
