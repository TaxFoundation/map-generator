import React, { useContext } from 'react';
import { csvParse } from 'd3-dsv';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';

const Data = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      <form>
        <div>
          <Label htmlFor="upload">
            {data.filename ? data.filename : 'Click to upload CSV file'}
          </Label>
          <input
            type="file"
            id="upload"
            name="upload"
            onChange={e => {
              const { files } = e.target;
              if (files.length > 1) {
                updateData({ id: 'filename', value: `Just One CSV, Please` });
              } else if (files[0].name.slice(-4) !== '.csv') {
                updateData({ id: 'filename', value: `CSV Files Only, Please` });
              } else {
                const reader = new FileReader();
                reader.onload = async event => {
                  const fileData = await csvParse(event.target.result);
                  updateData({ id: 'rawData', value: fileData });
                  updateData({ id: 'columns', value: fileData.columns });
                };
                reader.readAsText(files[0]);
                updateData({ id: 'filename', value: `Using ${files[0].name}` });
              }
            }}
          />
        </div>
        {data.columns ? (
          <div>
            <Label htmlFor="id-column">Which column is the ID?</Label>
            <select
              name="id-column"
              id="id-column"
              value={data.idColumn}
              onChange={e =>
                updateData({
                  id: 'idColumn',
                  value: e.target.value,
                })
              }
            >
              <option value={null}>¯\_(ツ)_/¯</option>
              {data.columns.map(c => (
                <option value={c}>{c}</option>
              ))}
            </select>
          </div>
        ) : null}
        {data.columns ? (
          <div>
            <Label htmlFor="id-column">Which column is the value?</Label>
            <select
              name="value-column"
              id="value-column"
              value={data.valueColumn}
              onChange={e =>
                updateData({
                  id: 'valueColumn',
                  value: e.target.value,
                })
              }
            >
              <option value={null}>¯\_(ツ)_/¯</option>
              {data.columns.map(c => (
                <option value={c}>{c}</option>
              ))}
            </select>
          </div>
        ) : null}
        <div>
          <Label htmlFor="map-geo-type">What type of map is this?</Label>
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
            <option value={null}>¯\_(ツ)_/¯</option>
            <option value="states">US States</option>
            <option value="counties">US Counties</option>
            <option value="europe">European Nations</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Data;
