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
          {data.isNumeric && (
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
              <div>
                <Label>Lowest Value in Scale</Label>
                <input
                  type="text"
                  value={data.domain[0]}
                  onChange={e => {
                    const newDomain = [+e.target.value, data.domain[1]];
                    updateData({ id: 'domain', value: newDomain });
                  }}
                />
              </div>
              <div>
                <Label>Highest Value in Scale</Label>
                <input
                  type="text"
                  value={data.domain[1]}
                  onChange={e => {
                    const newDomain = [data.domain[0], +e.target.value];
                    updateData({ id: 'domain', value: newDomain });
                  }}
                />
              </div>
              <Select
                id="colorMode"
                label="What color mode should be used?"
                options={[
                  { id: 'lch', label: 'Lightness, chroma, hue' },
                  { id: 'rgb', label: 'Red, Green, Blue' },
                  { id: 'lrgb', label: 'Linear Red, Green, Blue' },
                  { id: 'lab', label: 'Lightness, a, b' },
                  { id: 'hsl', label: 'Hue, Saturation, Lightness' },
                  { id: 'hcl', label: 'Hue, Chroma, Lightness' },
                  { id: 'hsv', label: 'Hue, Saturation, Value' },
                ]}
              />
            </>
          )}
        </form>
      ) : (
        <p>Waiting for map data options to be set...</p>
      )}
    </div>
  );
};

export default Style;
