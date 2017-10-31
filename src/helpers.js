import chroma from 'chroma-js';

export const colorScale = (colors, theDomain) => {
  return chroma.scale(colors).domain(theDomain).mode('lch');
};