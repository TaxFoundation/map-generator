import React, { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';
import RadioGroup from '../ui/RadioGroup';

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
          <RadioGroup
            id="formatType"
            label="How should the values be formatted?"
            options={[
              { id: 'number', label: 'Number' },
              { id: 'percent', label: 'Percent' },
              { id: 'dollar', label: 'Dollar' },
            ]}
          />
        </form>
      ) : null}
    </div>
  );
};

export default Style;
