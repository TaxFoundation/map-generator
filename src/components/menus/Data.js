import React, { useState, useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import CollapsibleMenu from '../ui/CollapsibleMenu';

const Data = () => {
  const [collapse, setCollapse] = useState(false);
  const { data, updateData } = useContext(DataContext);
  return (
    <>
      <h3>
        Data{' '}
        <span onClick={() => setCollapse(!collapse)}>
          [{collapse ? 'show' : 'hide'}]
        </span>
      </h3>
      <CollapsibleMenu collapse={collapse}>
        <form>
          <div>
            <label htmlFor="map-geo-type">What type of map is this?</label>
            <select
              name="map-geo-type"
              id="map-geo-type"
              value={data.mapGeographyType}
              onChange={e =>
                updateData({
                  id: 'mapGeographyType',
                  value: e.target.value,
                })
              }
            >
              <option value="states">US States</option>
              <option value="counties">US Counties</option>
              <option value="europe">European Nations</option>
            </select>
          </div>
          <div>
            <label htmlFor="map-data-type">What type of data is this?</label>
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
              <option value="sequential">Sequential</option>
              <option value="divergent">Divergent</option>
              <option value="qualitative">Qualitative</option>
            </select>
          </div>
        </form>
      </CollapsibleMenu>
    </>
  );
};

export default Data;
