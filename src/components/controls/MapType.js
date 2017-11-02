import React from 'react';
import { MenuItem } from 'material-ui/Menu/Menu';
import Select from 'material-ui/Select';

const MapType = (props) => {
  const types = ['states', 'counties'];

  return (
    <div>
      <Select
        onChange={event => {
          props.updateMapType(event.target.value);
        }}
        value={props.mapType}
      >
        {types.map(t => {
          return (
            <MenuItem
              key={`data-type-${t}`}
              value={t}
            >
              {t.charAt(0).toLocaleUpperCase() + t.slice(1)}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default MapType;
