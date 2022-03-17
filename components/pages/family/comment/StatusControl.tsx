import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";

type Props = {
  active: boolean;
  changeActive: (status: boolean) => void;
};

export const StatusControl = ({ active, changeActive }: Props): JSX.Element => {
  const [checked, setChecked] = useState<boolean>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    changeActive(event.target.checked);
  };

  useEffect(() => {
    if (active === true || active === false) setChecked(active);
  }, [active]);

  return (
    <div className="w-full flex items-center justify-center md:justify-start mb-8">
      <span className="text-lg">{`開放留言功能`}</span>
      {(checked === true || checked === false) && (
        <Switch
          defaultChecked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      )}
    </div>
  );
};
