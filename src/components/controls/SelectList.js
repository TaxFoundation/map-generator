import React from 'react';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const SelectList = props => {
  const types = props.types;

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={props.listName}>{props.label}</InputLabel>
      <Select
        input={<Input id={props.listName} />}
        onChange={event => {
          props.update(event.target.value);
        }}
        value={props.value}
      >
        {types.map(t => {
          const text = t.charAt(0).toLocaleUpperCase() + t.slice(1);
          return (
            <MenuItem key={`map-type-${t}`} value={t}>
              {text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectList;
