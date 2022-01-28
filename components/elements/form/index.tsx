import React from "react";
import { Password, PasswordProps } from "./Password";
import { Text, TextProps } from "./Text";
import { Radio, RadioProps } from "./Radio";
import { Select, SelectProps } from "./Select";
import { Check, CheckProps } from "./Checkbox";
import { Switch, SwitchProps } from "./Switch";
import { Alert } from "./Alert";
import { FieldSet } from "./FieldSet";
import { DatePicker, DatePickerProps } from "./DatePicker";

function Input<T>(
  props:
    | SelectProps<T>
    | DatePickerProps<T>
    | CheckProps<T>
    | RadioProps<T>
    | PasswordProps<T>
    | RadioProps<T>
    | SwitchProps<T>
    | TextProps<T>
) {
  if (props.type === "select") return <Select {...props} />;
  if (props.type === "date") return <DatePicker {...props} />;
  if (props.type === "check") return <Check {...props} />;
  if (props.type === "radio") return <Radio {...props} />;
  if (props.type === "switch") return <Switch {...props} />;
  if (props.type === "password") return <Password {...props} />;
  return <Text {...props} />;
}

const Form = {
  Input,
  Alert,
  FieldSet,
};

export default Form;
