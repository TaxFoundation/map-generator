import React, { useContext, useEffect, useState } from 'react';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';
import Select from '../ui/Select';
import RadioGroup from '../ui/RadioGroup';
import NumberInput from '../ui/NumberInput';
import PaletteSelect from '../ui/PaletteSelect';

const DomainControls = ({ minData, maxData, update }) => {
  const [min, setMin] = useState(minData);
  const [max, setMax] = useState(maxData);

  useEffect(() => {
    let newMin = minData;
    let newMax = maxData;
    if (!Number.isNaN(min) && +min !== minData) newMin = +min;
    if (!Number.isNaN(max) && +max !== maxData) newMax = +max;
    if (newMin !== minData || newMax !== maxData)
      update({ id: 'domain', value: [newMin, newMax] });
  }, [min, max, minData, maxData, update]);

  return (
    <>
      <div>
        <Label>Lowest Value in Scale</Label>
        <input
          type="text"
          inputMode="numeric"
          pattern="-?[0-9]*\.?[0-9]*"
          value={min}
          onChange={e => {
            setMin(e.target.value);
          }}
        />
      </div>
      <div>
        <Label>Highest Value in Scale</Label>
        <input
          type="text"
          inputMode="numeric"
          pattern="-?[0-9]*\.?[0-9]*"
          value={max}
          onChange={e => {
            setMax(e.target.value);
          }}
        />
      </div>
    </>
  );
};

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
              <PaletteSelect />
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
              <DomainControls
                minData={data.domain[0]}
                maxData={data.domain[1]}
                update={updateData}
              />
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
