import { ReactNode } from "react";
import { FormControl, FormLabel, FormGroup } from "@mui/material";

type FieldSetProps = {
  children: ReactNode;
  label: string;
  required?: boolean;
  className?: string;
  labelClass?: string;
};
export const FieldSet = ({
  children,
  label,
  required,
  className,
  labelClass,
}: FieldSetProps) => {
  return (
    <FormControl component="fieldset" className={className}>
      <FormLabel component="legend" required={required} className={labelClass}>
        {label}
      </FormLabel>

      <FormGroup className="space-y-4">{children}</FormGroup>
    </FormControl>
  );
};
