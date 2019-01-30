import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const SelectList = props => {
  const disabled = props.disabled || false;
  const types = props.types;

  return (
    <div className={props.className}>
      <FormControl fullWidth disabled={disabled}>
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
  disabled: PropTypes.bool,
  listName: PropTypes.string,
  label: PropTypes.string,
  types: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  update: PropTypes.func,
  value: PropTypes.node,
};

export default SelectList;
