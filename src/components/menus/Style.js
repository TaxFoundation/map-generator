import React, { useState, useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import CollapsibleMenu from '../ui/CollapsibleMenu';

const Style = () => {
  const [collapse, setCollapse] = useState(false);
  const { data, updateData } = useContext(DataContext);
  return (
    <>
      <h3>
        Style{' '}
        <span onClick={() => setCollapse(!collapse)}>
          [{collapse ? 'show' : 'hide'}]
        </span>
      </h3>
      <CollapsibleMenu collapse={collapse}>
        <form>
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
      </CollapsibleMenu>
    </>
  );
};

export default Style;
