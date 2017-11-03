import React from 'react';
import { colorScale } from '../../helpers';

const PalettePreview = props => {
  return (
    <div style={{ width: '100%' }}>
      {[...Array(props.steps).keys()].map(s => {
        return (
          <div
            key={`palette-step-${s + 1}`}
            style={{
              backgroundColor: colorScale(props.palette, [
                0,
                props.steps - 1
              ])(s),
              display: 'inline-block',
              height: '20px',
              marginTop: '6px',
              width: `${100 / props.steps}%`
            }}
          />
        );
      })}
    </div>
  );
};

export default PalettePreview;