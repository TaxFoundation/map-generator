import React, { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';

const isNumericData = values => {
  for (let i = 0, j = values.length; i < j; i++) {
    if (Number.isNaN(+values[i].value)) {
      return false;
    }
  }
  return true;
};

const Style = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      {data.mapData ? (
        <form>
          <div>
            <Label htmlFor="map-data-type">What type of data is this?</Label>
            <select
              name="map-data-type"
              id="map-data-type"
              value={data.mapDataType}
              onChange={e =>
                updateData({
                  id: 'mapDataType',
                  value: e.target.value,
                })
              }
            >
              {isNumericData(data.mapData) ? (
                <>
                  <option value="sequential">Sequential</option>
                  <option value="divergent">Divergent</option>
                </>
              ) : null}

              <option value="qualitative">Qualitative</option>
            </select>
          </div>
          <div>
            <label htmlFor="number-format">
              How should the values be formatted?
            </label>
            <input
              checked={data.dataType === 'number'}
              onChange={e =>
                updateData({
                  id: 'dataType',
                  value: e.target.value,
                })
              }
              id="number-format-1"
              name="number-format"
              type="radio"
              value="number"
            />
            <label htmlFor="number-format-1">Number</label>
            <input
              checked={data.dataType === 'percent'}
              onChange={e =>
                updateData({
                  id: 'dataType',
                  value: e.target.value,
                })
              }
              id="number-format-2"
              name="number-format"
              type="radio"
              value="percent"
            />
            <label htmlFor="number-format-2">Percent</label>
            <input
              checked={data.dataType === 'dollar'}
              onChange={e =>
                updateData({
                  id: 'dataType',
                  value: e.target.value,
                })
              }
              id="number-format-3"
              name="number-format"
              type="radio"
              value="dollar"
            />
            <label htmlFor="number-format-13">Dollar</label>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default Style;
