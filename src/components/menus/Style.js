import React, { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';
import Select from '../ui/Select';
import RadioGroup from '../ui/RadioGroup';

const Style = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      {data.mapData ? (
        <form>
          {data.isNumeric ? (
            <Select
              id="numericDataType"
              label="What type of quantitative data is this?"
              options={[
                { id: 'sequential', label: 'Sequential →' },
                { id: 'divergent', label: 'Divergent ↔' },
              ]}
            />
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
