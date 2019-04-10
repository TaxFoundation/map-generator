import React, { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import FileInput from '../ui/FileInput';
import Label from '../ui/Label';
import Select from '../ui/Select';

const Data = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      <form>
        <FileInput />
        {data.columns ? (
          <>
            <Select
              id="idColumn"
              label="Which column is the ID?"
              options={data.columns}
            />
            <Select
              id="valueColumn"
              label="Which column is the value?"
              options={data.columns}
            />
          </>
        ) : null}
        <div>
          <Label htmlFor="map-geo-type">What type of map is this?</Label>
          <select
            name="map-geo-type"
            id="map-geo-type"
            value={data.mapGeographyType}
            onChange={e =>
              updateData({
                id: 'mapGeographyType',
                value: e.target.value,
              })
            }
          >
            <option value={null}>¯\_(ツ)_/¯</option>
            <option value="states">US States</option>
            <option value="counties">US Counties</option>
            <option value="europe">European Nations</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Data;
