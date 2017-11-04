import chroma from 'chroma-js';
import { csvParse } from 'd3-dsv';
import states from './data/states';

export const colorScale = (colors, theDomain, value, mode = 'lch') => {
  return chroma.scale(colors).domain(theDomain).mode(mode)(value);
};

export const labelColor = (backgroundColor) => {
  return chroma.contrast('#000', backgroundColor) > 4.5 ? '#000000' : '#ffffff';
};

export const readCSVFile = (file, updateRawData, updateRawColumnHeaders) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (file.type !== 'text/csv') {
      return;
    } else {
      let data = csvParse(event.target.result);
      updateRawData(data);
      updateRawColumnHeaders(data.columns);
    }
  };
  reader.readAsText(file);
};

export const validateIdChoice = (data, id) => {
  const ids = data.map(d => d[id]);
  const fips = states.map(s => s.id);
  const abbrs = states.map(s => s.abbr);
  const names = states.map(s => s.name);

  const matcher = (ids, list) => {
    return ids.reduce((sum, id) => {
      if (fips.includes(id)) {
        return sum++;
      } else {
        return sum;
      }
    });
  };

  let fipsMatches = matcher(ids, fips);
  let abbrsMatches = matcher(ids, abbrs);
  let namesMatches = matcher(ids, names);

  console.log(fipsMatches, abbrsMatches, namesMatches);
};