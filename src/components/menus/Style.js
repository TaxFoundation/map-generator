import React, { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';
import { isNumericData } from '../../helpers';

const Style = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      {data.mapData ? (
        <form>
          {data.isNumeric ? (
            <div>
              <Label htmlFor="numeric-data-type">
                What type of quantitative data is this?
              </Label>
              <select
                name="numeric-data-type"
                id="numeric-data-type"
                value={data.numericDataType}
                onChange={e =>
                  updateData({
                    id: 'numericDataType',
                    value: e.target.value,
                  })
                }
              >
                <option value="sequential">Sequential</option>
                <option value="divergent">Divergent</option>
              </select>
            </div>
          ) : null}
          <div>
            <label htmlFor="number-format">
              How should the values be formatted?
            </label>
            <input
              checked={data.formatType === 'number'}
              onChange={e =>
                updateData({
                  id: 'formatType',
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
              checked={data.formatType === 'percent'}
              onChange={e =>
                updateData({
                  id: 'formatType',
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
              checked={data.formatType === 'dollar'}
              onChange={e =>
                updateData({
                  id: 'formatType',
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
