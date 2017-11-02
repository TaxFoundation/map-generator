import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const DataType = (props) => {
  const types = ['sequential', 'divergent', 'qualitative'];

  return (
    <div>
      <Select
        floatingLabelText="What Type of Data is This?"
        fullWidth={true}
        onChange={event => {
          props.updateDataType(event.target.value);
        }}
        value={props.dataType}
      >
        {types.map(t => {
          return (
            <MenuItem
              key={`data-type-${t}`}
              value={t}
              primaryText={t.charAt(0).toLocaleUpperCase() + t.slice(1)}
            />
          );
        })}
      </Select>
    </div>
  );
};

export default DataType;
