import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const DataType = (props) => {
  const types = ['sequential', 'divergent', 'qualitative'];

  return (
    <div>
      <SelectField
        floatingLabelText="What Type of Data is This?"
        fullWidth={true}
        onChange={(e, i, v) => {
          props.updateDataType(v);
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
      </SelectField>
    </div>
  );
};

export default DataType;
