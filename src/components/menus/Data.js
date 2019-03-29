import React, { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';

const Data = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          updateData({ do: 'update', id: 'paletteId', value: 2 });
          console.log(data);
        }}
      >
        Rando
      </button>
    </div>
  );
};

export default Data;
