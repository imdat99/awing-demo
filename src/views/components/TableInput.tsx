import { FormControl, Input, InputProps } from "@mui/material";
import { useState } from "react";

const TableInput: React.FC<
  InputProps & { isError: (v: string) => boolean }
> = ({ isError, ...inputProps }) => {
  const [innerValue, setInnerValue] = useState(String(inputProps.defaultValue));
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInnerValue(e.target.value);
  };
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <Input
        {...inputProps}
        onChange={handleChange}
        error={isError(innerValue)}
      />
    </FormControl>
  );
};

export default TableInput;
