import React, { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';

const Data = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <form>
      <label htmlFor="map-data-type">What type of data is this?</label>
      <select
        name="map-data-type"
        id="map-data-type"
        value={data.mapDataType}
        onChange={e =>
          updateData({ do: 'update', id: 'mapDataType', value: e.target.value })
        }
      >
        <option value="sequential">Sequential</option>
        <option value="divergent">Divergent</option>
        <option value="qualitative">Qualitative</option>
      </select>
      <button
        type="button"
        onClick={() => {
          updateData({ do: 'update', id: 'paletteId', value: 2 });
          console.log(data);
        }}
      >
        Rando
      </button>
    </form>
  );
};

export default Data;
