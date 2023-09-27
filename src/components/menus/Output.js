import React, { useContext } from 'react';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import { saveSVG } from '../../helpers';

const Download = styled.a`
  border: 1px solid #FFD53D;
  border-radius: 0px;
  background-color: #FFD53D;
  color: #162127;
  cursor: pointer;
  padding: 1rem 2rem;
  margin-top: 2rem;
  text-decoration: none;
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
  user-select: none;

  &:hover,
  &:focus,
  & + input[type='file']:focus,
  & + input[type='file']:hover {
    background-color: #FFC800;
    color: #162127;
  }

  & + input[type='file']:focus {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

const Output = () => {
  const { data } = useContext(DataContext);
  const theSVG = document.getElementById('generated-map');

  const filename = data.filename || 'map';

  if (theSVG) {
    return (
      <div>
        <Download href={saveSVG('generated-map')} download={`${filename}.svg`}>
          Download Map SVG
        </Download>
      </div>
    );
  }
  return <p>Waiting for a map to be generated...</p>;
};

export default Output;
