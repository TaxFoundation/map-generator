import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import {
  sequentialPalettes,
  divergentPalettes,
  qualitativePalettes,
} from '../../data/colorPalette';
import { colorScale } from '../../helpers';
import Modal from './Modal';

function choosePalette(type) {
  switch (type) {
    case 'sequential':
      return sequentialPalettes;
    case 'divergent':
      return divergentPalettes;
    default:
      return qualitativePalettes;
  }
}

const StyledPaletteList = styled.ul`
  display: grid;
  grid-gap: 1rem;
  grid-template: auto / repeat(3, 1fr);
`;

const Palette = styled.li`
  cursor: pointer;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: 20px;
`;

const PaletteChunk = styled.div`
  background-color: ${props => props.bg};
  height: '20px';
  width: ${props => props.width};
`;

const PaletteList = ({ palettes, close }) => {
  const { data, updateData } = useContext(DataContext);
  return (
    <StyledPaletteList>
      {palettes.map(p => (
        <Palette
          columns={data.bins}
          key={`palette-${data.numericDataType}-${p.id}`}
          onClick={() => {
            updateData({ id: 'paletteId', value: p.id });
            close();
          }}
        >
          {[...Array(data.bins).keys()].map((d, i) => (
            <PaletteChunk
              bg={colorScale(
                p.palette,
                [0, data.bins - 1],
                d,
                data.bins,
                data.colorMode
              )}
              key={`palette-${data.numericDataType}-${p.id}-${i}`}
            />
          ))}
        </Palette>
      ))}
    </StyledPaletteList>
  );
};

const PaletteSelect = () => {
  const { data } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)}>
        Change Palette
      </button>
      {open && (
        <Modal>
          <h1>Test Palette Select</h1>
          <PaletteList
            palettes={choosePalette(data.numericDataType)}
            close={() => setOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default PaletteSelect;
