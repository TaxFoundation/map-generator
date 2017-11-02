import chroma from 'chroma-js';

export const colorScale = (colors, theDomain) => {
  return chroma.scale(colors).domain(theDomain).mode('lch');
};

export const labelColor = (backgroundColor) => {
  return chroma.contrast('#000', backgroundColor) > 4.5 ? '#000000' : '#ffffff';
}