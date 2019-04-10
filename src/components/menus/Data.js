import React, { useContext } from 'react';
import { csvParse } from 'd3-dsv';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import Label from '../ui/Label';
import Select from '../ui/Select';

const FileLabel = styled.label`
  border-radius: 4px;
  border: 1px solid #0094ff;
  color: #0094ff;
  cursor: pointer;
  display: block;
  font-size: 1.4rem;
  overflow: hidden;
  padding: 0.5rem;
  text-align: center;
  text-overflow: ellipsis;
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
  user-select: none;
  white-space: nowrap;

  &:hover,
  &:focus,
  & + input[type='file']:focus,
  & + input[type='file']:hover {
    background-color: #0094ff;
    color: #fff;
  }

  & + input[type='file']:focus {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

const FileInput = styled.input`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
`;

const Data = () => {
  const { data, updateData } = useContext(DataContext);
  return (
    <div>
      <form>
        <div>
          <FileLabel htmlFor="upload">
            {data.filename ? data.filename : 'Click to upload CSV file'}
          </FileLabel>
          <FileInput
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
          <>
            <Select
              id="idColumn"
              label="Which column is the ID?"
              options={data.columns}
            />
            <Select
              id="valueColumn"
              label="Which column is the value?"
              options={data.columns}
            />
          </>
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
