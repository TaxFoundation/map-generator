import React, { useContext } from 'react';
import styled from 'styled-components';

import { DataContext } from '../contexts/DataContext';
import Panel from '../components/ui/Panel';
import PanelHeading from '../components/ui/PanelHeading';
import HR from '../components/ui/HR';
import States from '../components/maps/States';
import Europe from '../components/maps/Europe';

const Check = styled.span`
  color: ${props => (props.valid ? 'green' : 'red')};
`;

function getMap(geography) {
  switch (geography) {
    case 'states':
      return <States />;
    case 'europe':
      return <Europe />;
    default:
      return null;
  }
}

const DataValidation = () => {
  const { data: mapContext } = useContext(DataContext);

  return (
    <>
      <div>
        <h3>Waiting for the following to be set...</h3>
        <ul>
          {[
            { data: mapContext.rawData, label: 'Data Uploaded' },
            { data: mapContext.idColumn, label: 'ID Chosen' },
            { data: mapContext.valueColumn, label: 'Value Chosen' },
            {
              data: mapContext.mapGeographyType,
              label: 'Geography Type Chosen',
            },
          ].map(item => (
            <li>
              <Check valid={item.data !== null}>{item.data ? '✓' : '✗'}</Check>{' '}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <HR />
      <div>
        <h3>Download sample CSV files.</h3>
        <ul>
          <li>
            <a href="csv/states.csv" download>
              US States
            </a>
          </li>
          <li>
            <a href="csv/europe.csv" download>
              Europe
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

const Map = () => {
  const { data: mapContext } = useContext(DataContext);
  const { mapGeographyType: geography } = mapContext;

  const dataReady =
    mapContext.rawData &&
    mapContext.idColumn &&
    mapContext.valueColumn &&
    geography;

  return (
    <Panel columns={2}>
      <PanelHeading>Map</PanelHeading>
      {dataReady ? getMap(geography) : <DataValidation />}
    </Panel>
  );
};

export default Map;
