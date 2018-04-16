import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const SelectList = props => {
  const types = props.types;

  return (
    <div className={props.className}>
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
            let text;
            switch (props.case) {
              case 'upper':
                text = t.toLocaleUpperCase();
                break;
              case 'first':
                text = t.charAt(0).toLocaleUpperCase() + t.slice(1);
                break;
              default:
                text = t;
            }
            return (
              <MenuItem key={`map-type-${t}`} value={t}>
                {text}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

SelectList.propTypes = {
  className: PropTypes.string,
  listName: PropTypes.string,
  label: PropTypes.string,
  update: PropTypes.func,
  value: PropTypes.node,
};

export default SelectList;
