import chroma from 'chroma-js';
import { csvParse } from 'd3-dsv';

export const colorScale = (colors, theDomain, mode = 'lch') => {
  return chroma.scale(colors).domain(theDomain).mode(mode);
};

export const labelColor = (backgroundColor) => {
  return chroma.contrast('#000', backgroundColor) > 4.5 ? '#000000' : '#ffffff';
};

export const readCSVFile = (file, handler) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (file.type !== 'text/csv') {
      return;
    } else {
      handler(csvParse(event.target.result));
    }
  };
  reader.readAsText(file);
};
