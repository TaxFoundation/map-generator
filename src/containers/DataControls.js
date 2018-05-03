import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import SelectList from '../components/controls/SelectList';
import UploadCSV from '../components/controls/UploadCSV';

class DataControls extends Component {
  render() {
    return (
      <MapGeneratorContext.Consumer>
        <div className="panel__section">
          <Typography variant="subheading">Upload Data</Typography>
          <UploadCSV
            updateRawData={this.props.updateRawData}
            updateRawColumnHeaders={this.props.updateRawColumnHeaders}
          />
          <Typography variant="subheading">Describe Your Data</Typography>
          <SelectList
            className="controls__control"
            listName="map-type"
            label="What type of US map is it?"
            types={['states', 'counties']}
            update={this.props.updateMapType}
            value={this.props.mapType}
            case="first"
          />
          <SelectList
            className="controls__control"
            list-name="id-select"
            label="Which column is the state ID?"
            types={this.props.rawColumnHeaders}
            update={this.props.updateId}
            value={this.props.id}
          />
          <SelectList
            className="controls__control"
            list-name="value-select"
            label="Which column is the value to map?"
            types={this.props.rawColumnHeaders}
            update={this.props.updateValue}
            value={this.props.value}
          />
        </div>
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
