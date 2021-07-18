import React from 'react';
import { Input } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const MaterialTextFieldFormControl = ({ name, label, value, setValue }) => {

  return (
    <FormControl required className="formControl">
      <InputLabel htmlFor={name}>
        {label}
      </InputLabel>
      <Input
        id={name}
        name={name}
        value={value}
        required
        onChange={(e) => setValue(e.target.value)}
      />
      <FormHelperText style={{ display: value.length>0 ? 'none' : 'block' }}>
        <span className="red">Required</span>
      </FormHelperText>
    </FormControl>
  );
}

export default MaterialTextFieldFormControl;