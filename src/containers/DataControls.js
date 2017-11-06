import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import SelectList from '../components/controls/SelectList';
import UploadCSV from '../components/controls/UploadCSV';
import {
  updateRawData,
  updateRawColumnHeaders,
  updateMapType,
  updateMapData,
  updateId,
  updateValue
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class DataControls extends Component {
  render() {
    return (
      <div className="panel__section">
        <Typography type="subheading">Upload Data</Typography>
        <UploadCSV
          updateRawData={this.props.updateRawData}
          updateRawColumnHeaders={this.props.updateRawColumnHeaders}
        />
        <Divider />
        <Typography type="subheading">Describe Your Data</Typography>
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
    );
  }
}

function mapStateToProps(state) {
  return {
    rawColumnHeaders: state.rawColumnHeaders,
    mapData: state.mapData,
    mapType: state.mapType,
    id: state.id,
    value: state.value
  };
}

// anything returned will end up as props in DataControls
function mapDispatchToProps(dispatch) {
  // whenever one of these is called, it's passed to reducers
  return bindActionCreators(
    {
      updateRawData: updateRawData,
      updateRawColumnHeaders: updateRawColumnHeaders,
      updateMapType: updateMapType,
      updateMapData: updateMapData,
      updateId: updateId,
      updateValue: updateValue
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DataControls);
