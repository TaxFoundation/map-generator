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
              options={data.columns.map(column => ({
                id: column,
                label: column,
              }))}
            />
            <Select
              id="valueColumn"
              label="Which column is the value?"
              options={data.columns.map(column => ({
                id: column,
                label: column,
              }))}
            />
          </>
        ) : null}
        <Select
          id="mapGeographyType"
          label="What type of map is this?"
          options={[
            { id: 'states', label: 'US States' },
            { id: 'counties', label: 'US Counties' },
            { id: 'europe', label: 'European Nations' },
          ]}
        />
      </form>
    </div>
  );
};

export default Data;
