import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapGeneratorContext from '../Context';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import SelectList from '../components/controls/SelectList';
import UploadCSV from '../components/controls/UploadCSV';

class DataControls extends Component {
  render() {
    return (
      <MapGeneratorContext.Consumer>
        {context => (
          <div className="panel__section">
            <Typography variant="subheading">Upload Data</Typography>
            <UploadCSV
              updateRawData={data => context.updateState('rawData', data)}
              updateRawColumnHeaders={data =>
                context.updateState('rawColumnHeaders', data)
              }
            />
            <Typography variant="subheading">Describe Your Data</Typography>
            <SelectList
              className="controls__control"
              listName="map-type"
              label="What type of US map is it?"
              types={['states', 'counties']}
              update={data => context.updateState('mapType', data)}
              value={context.state.mapType}
              case="first"
            />
            <SelectList
              className="controls__control"
              list-name="id-select"
              label="Which column is the state ID?"
              types={context.state.rawColumnHeaders}
              update={data => context.updateMapData('id', data)}
              value={context.state.id}
            />
            <SelectList
              className="controls__control"
              list-name="value-select"
              label="Which column is the value to map?"
              types={context.state.rawColumnHeaders}
              update={data => context.updateMapData('value', data)}
              value={context.state.value}
            />
          </div>
        )}
      </MapGeneratorContext.Consumer>
    );
  }
}

DataControls.propTypes = {
  id: PropTypes.string,
  mapType: PropTypes.string,
  rawColumnHeaders: PropTypes.arrayOf(PropTypes.string),
  updateId: PropTypes.func,
  updateMapType: PropTypes.func,
  updateRawColumnHeaders: PropTypes.func,
  updateRawData: PropTypes.func,
  updateValue: PropTypes.func,
  value: PropTypes.string,
};

export default DataControls;
