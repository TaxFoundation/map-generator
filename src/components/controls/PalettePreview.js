import React from 'react';
import PropTypes from 'prop-types';
import { colorScale } from '../../helpers';

const PalettePreview = props => {
  return (
    <div style={{ width: '100%' }}>
      {[...Array(props.steps).keys()].map(s => {
        let fill = colorScale(
          props.palette,
          [0, props.steps - 1],
          s,
          props.steps,
          props.colorMode
        );

        return (
          <div
            key={`palette-step-${s + 1}`}
            style={{
              backgroundColor: fill,
              display: 'inline-block',
              height: '20px',
              marginTop: '6px',
              width: `${100 / props.steps}%`,
            }}
          />
        );
      })}
    </div>
  );
};

PalettePreview.propTypes = {
  steps: PropTypes.number,
  palette: PropTypes.arrayOf(PropTypes.string),
  colorMode: PropTypes.string,
};

export default PalettePreview;
