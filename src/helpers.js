import chroma from 'chroma-js';
import { csvParse } from 'd3-dsv';
import { format } from 'd3-format';
import {
  sequentialPalettes,
  divergentPalettes,
  qualitativePalettes,
} from './data/colorPalette';

export const colorScale = (colors, theDomain, value, steps, mode = 'lch') =>
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

export const getPalette = (id, type) => {
  switch (type) {
    case 'qualitative':
      return (
        qualitativePalettes.find(p => p.id === id).palette || [
          '#000000',
          '#ffffff',
        ]
      );
    case 'divergent':
      return (
        divergentPalettes.find(p => p.id === id).palette || [
          '#000000',
          '#ffffff',
        ]
      );
    case 'sequential':
      return (
        sequentialPalettes.find(p => p.id === id).palette || [
          '#000000',
          '#ffffff',
        ]
      );
    default:
      return ['#000000', '#ffffff'];
  }
};

export const isNumericData = values => {
  for (let i = 0, j = values.length; i < j; i++) {
    if (Number.isNaN(+values[i].value)) {
      return false;
    }
  }
  return true;
};
