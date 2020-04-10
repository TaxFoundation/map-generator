import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import {
  sequentialPalettes,
  divergentPalettes,
  qualitativePalettes,
} from '../../data/colorPalette';
import { colorScale, directedPalette } from '../../helpers';
import Modal from './Modal';
import Label from './Label';
import Toggle from './Toggle';

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
  grid-gap: 2rem;
  grid-template: auto / repeat(3, 1fr);
`;

const Palette = styled.li`
  cursor: pointer;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: 40px;
`;

const PaletteChunk = styled.div`
  background-color: ${props => props.bg};
  height: 40px;
`;

const StyledButton = styled.button`
  border: 0;
  cursor: pointer;
  display: block;
  padding: 0;
  width: 100%;
`;

const PaletteList = ({ palettes, type, close }) => {
  const { data, updateData } = useContext(DataContext);

  return (
    <StyledPaletteList>
      {palettes.map(p => (
        <Palette
          columns={data.bins}
          key={`palette-${type}-${p.id}`}
          onClick={() => {
            updateData({ id: 'paletteId', value: p.id });
            close();
          }}
        >
          {[...Array(data.bins).keys()].map((d, i) => (
            <PaletteChunk
              bg={colorScale(
                directedPalette(p.palette, data.paletteDirectionFlipped),
                [0, data.bins - 1],
                d,
                data.bins,
                data.colorMode
              )}
              key={`palette-${type}-${p.id}-${i}`}
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

  const paletteType = data.isNumeric ? data.numericDataType : 'divergent';

  const currentPalette = choosePalette(paletteType).find(
    p => data.paletteId === p.id
  );

  return (
    <div>
      <Label htmlFor="palette">Change Current Palette</Label>
      <StyledButton type="button" id="palette" onClick={() => setOpen(!open)}>
        <Palette>
          {[...Array(data.bins).keys()].map((d, i) => (
            <PaletteChunk
              bg={colorScale(
                directedPalette(
                  currentPalette.palette,
                  data.paletteDirectionFlipped
                ),
                [0, data.bins - 1],
                d,
                data.bins,
                data.colorMode
              )}
              key={`current-palette-${paletteType}-${data.paletteId}-${i}`}
            />
          ))}
        </Palette>
      </StyledButton>
      {open && (
        <Modal title="Choose a New Palette" close={() => setOpen(false)}>
          <PaletteList
            type={paletteType}
            palettes={choosePalette(paletteType)}
            close={() => setOpen(false)}
          />
        </Modal>
      )}
      <Toggle id="paletteDirectionFlipped" label="Flip palette direction?" />
    </div>
  );
};

export default PaletteSelect;
