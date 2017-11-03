// take in raw data
export function updateRawData(rawData) {
  return {
    type: 'UPDATE_RAW_DATA',
    rawData
  };
}

// update map type
export function updateMapType(mapType) {
  return {
    type: 'UPDATE_MAP_TYPE',
    mapType
  };
}

// update data
export function updateMapData(mapData) {
  return {
    type: 'UPDATE_MAP_DATA',
    mapData
  };
}
// update data type
export function updateDataType(dataType) {
  return {
    type: 'UPDATE_DATA_TYPE',
    dataType
  };
}

// update column headers
export function updateColumnHeaders(headers) {
  return {
    type: 'UPDATE_COL_HEADERS',
    headers
  };
}

// update domain
export function updateDomain(domain) {
  return {
    type: 'UPDATE_DOMAIN',
    domain
  };
}


// update colors
export function updateColors(colors) {
  return {
    type: 'UPDATE_COLORS',
    colors
  };
}

// update steps
export function updateSteps(steps) {
  return {
    type: 'UPDATE_STEPS',
    steps
  };
}

// update label format

// update tooltip format

// update legend format