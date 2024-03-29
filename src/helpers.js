import chroma from 'chroma-js';
import { csvParse } from 'd3-dsv';
import { format } from 'd3-format';
import {
  sequentialPalettes,
  divergentPalettes,
  qualitativePalettes,
} from './data/colorPalette';

export const colorScale = (colors, theDomain, value, steps, mode) =>
  chroma
    .scale(colors)
    .domain(theDomain)
    .mode(mode)
    .classes(steps)(value);

export const labelColor = backgroundColor =>
  chroma.contrast('#000', backgroundColor) > 9 ? '#000000' : '#ffffff';

export const readCSVFile = (file, updateRawData, updateRawColumnHeaders) => {
  const reader = new FileReader();
  reader.onload = async event => {
    const data = await csvParse(event.target.result);
    updateRawData(data);
    updateRawColumnHeaders(data.columns);
  };
  reader.readAsText(file);
};

export const range = startAndEnd => {
  const newArray = [];
  for (let s = startAndEnd[0], e = startAndEnd[1]; s <= e; s++) {
    newArray.push(s);
  }
  return newArray.sort((a, b) => a - b);
};

export const saveSVG = elementId => {
  const theSVG = document.getElementById(elementId).outerHTML;
  const theBlob = new Blob(
    ['<?xml version="1.0" standalone="no"?>\r\n', theSVG],
    {
      type: 'image/svg_xml;charset=utf-8',
    }
  );
  const downloadURL = URL.createObjectURL(theBlob);

  return downloadURL;
};

export const formatter = (parameters, value) => {
  const dollar = parameters.format === 'dollar' ? '$' : '';
  const percentage = parameters.format === 'percent' ? '%' : '';
  const comma = parameters.comma ? ',' : '';
  let decimalPlaces = '';
  if (parameters.format === 'percent') {
    decimalPlaces = `.${parameters.decimals}`;
  } else {
    decimalPlaces = `.${parameters.decimals}f`;
  }

  const theFormat = `${dollar}${comma}${
    parameters.decimals >= 0 ? decimalPlaces : ''
  }${percentage}`;

  return format(theFormat)(value / parameters.unit);
};

export const directedPalette = (palette, flipped) => {
  const thePalette = flipped ? palette.slice().reverse() : palette;
  return thePalette;
};

export const getPalette = (id, type, flipped) => {
  const defaultPalette = directedPalette(['#000000', '#ffffff']);
  switch (type) {
    case 'qualitative':
      return (
        directedPalette(
          qualitativePalettes.find(p => p.id === id).palette,
          flipped
        ) || defaultPalette
      );
    case 'divergent':
      return (
        directedPalette(
          divergentPalettes.find(p => p.id === id).palette,
          flipped
        ) || defaultPalette
      );
    case 'sequential':
      return (
        directedPalette(
          sequentialPalettes.find(p => p.id === id).palette,
          flipped
        ) || defaultPalette
      );
    default:
      return defaultPalette;
  }
};

export function convertPercentageString(value) {
  if (!value) return null;
  const lazyPercentCheck = String(value).match(/(-?\d+)%/);
  if (lazyPercentCheck) {
    return +lazyPercentCheck[1] / 100;
  }
}

export function valueConvert(value) {
  if (!value) return null;
  if (convertPercentageString(value)) return convertPercentageString(value);
  if (Number.isNaN(value)) {
    return value;
  }
  return +value;
}

export const isNumericData = values => {
  for (let i = 0, j = values.length; i < j; i++) {
    if (Number.isNaN(valueConvert(values[i].value))) {
      return false;
    }
  }
  return true;
};

export const isPercentageStringData = values => {
  for (let i = 0, j = values.length; i < j; i++) {
    if (!convertPercentageString(values[i])) {
      console.log(values[i]);
      return false;
    }
  }
  return true;
};

export const generateMapData = (rawData, id, value, rank = null) => {
  const mapData = rawData.map(d => {
    if (rank) {
      return { id: d[id], value: valueConvert(d[value]), rank: d[rank] };
    }
    return { id: d[id], value: valueConvert(d[value]) };
  });
  return mapData;
};
