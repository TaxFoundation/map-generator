import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../contexts/DataContext';
import {
  sequentialPalettes,
  divergentPalettes,
  qualitativePalettes,
} from '../../data/colorPalette';
import { colorScale } from '../../helpers';
import Modal from './Modal';

const PaletteList = ({ palettes }) => {
  const { data, updateData } = useContext(DataContext);
  return (
    <ul>
      {palettes.map(p => (
        <li>
          {[...Array(data.bins).keys()].map(d => (
            <div
              key={`palette-${data.numericDataType}-${p.id}`}
              style={{
                backgroundColor: colorScale(
                  p.palette,
                  [0, data.bins - 1],
                  d,
                  data.bins,
                  data.colorMode
                ),
                height: '20px',
                width: `${100 / data.bins}%`,
              }}
            />
          ))}
        </li>
      ))}
    </ul>
  );
};

const PaletteSelect = () => {
  const { data, updateData } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)}>
        Click
      </button>
      {open && (
        <Modal>
          <h1>Test Palette Select</h1>
        </Modal>
      )}
    </div>
  );
};

export default PaletteSelect;
