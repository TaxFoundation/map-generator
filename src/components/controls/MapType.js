import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const MapType = (props) => {
  const types = ['states', 'counties'];

  return (
    <div>
      <SelectField
        floatingLabelText="Are We Mapping States or Counties?"
        fullWidth={true}
        onChange={(e, i, v) => {
          props.updateMapType(v);
        }}
        value={props.mapType}
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

export default MapType;
