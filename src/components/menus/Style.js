import React, { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';
import Select from '../ui/Select';
import RadioGroup from '../ui/RadioGroup';
import NumberInput from '../ui/NumberInput';

const Style = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      {data.mapData ? (
        <form>
          {data.isNumeric ? (
            <>
              <Select
                id="numericDataType"
                label="What type of quantitative data is this?"
                options={[
                  { id: 'sequential', label: 'Sequential →' },
                  { id: 'divergent', label: 'Divergent ↔' },
                ]}
              />
              <RadioGroup
                id="formatType"
                label="How should the values be formatted?"
                options={[
                  { id: 'number', label: 'Number' },
                  { id: 'percent', label: 'Percent' },
                  { id: 'dollar', label: 'Dollar' },
                ]}
              />
              <NumberInput
                label="How many decimal places should be displayed?"
                id="decimals"
              />
              <NumberInput
                label="How many bins should this data be divided into?"
                id="bins"
              />
            </>
          ) : null}
        </form>
      ) : null}
    </div>
  );
};

export default Style;
