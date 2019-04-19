import React, { useContext } from 'react';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import { saveSVG } from '../../helpers';

const Download = styled.a`
  border: 1px solid #0094ff;
  border-radius: 4px;
  background-color: #0094ff;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  text-decoration: none;
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
  user-select: none;

  &:active,
  &:hover,
  &:visited {
    color: #fff;
    text-decoration: none;
  }
`;

const Output = () => {
  const { data } = useContext(DataContext);
  const theSVG = document.getElementById('generated-map');
  if (theSVG) {
    return (
      <div>
        <Download
          href={saveSVG('generated-map')}
          download={`${data.filename}.svg`}
        >
          Download Map SVG
        </Download>
      </div>
    );
  }
  return <p>Waiting for a map to be generated...</p>;
};

export default Output;
