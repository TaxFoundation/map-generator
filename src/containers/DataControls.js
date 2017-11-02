import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import SelectList from '../components/controls/SelectList';
import {
  updateMapType,
  updateMapData,
  updateColumnHeaders
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class DataControls extends Component {
  render() {
    return (
      <div className="panel__section">
        <Typography type="subheading">Upload Data</Typography>
        <input
          accept="csv,CSV"
          id="file"
          style={{display: 'none'}}
          type="file"
        />
        <label htmlFor="file">
          <Button color="primary" component="span" raised>Upload a CSV File</Button>
        </label>
        <Divider />
        <Typography type="subheading">Describe Your Data</Typography>
        <SelectList
          listName="map-type"
          types={['states', 'counties']}
          update={this.props.updateMapType}
          value={this.props.mapType}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapData: state.mapData,
    mapType: state.mapType,
    columnHeaders: state.columnHeaders
  };
}

// anything returned will end up as props in DataControls
function mapDispatchToProps(dispatch) {
  // whenever one of these is called, it's passed to reducers
  return bindActionCreators(
    {
      updateMapType: updateMapType,
      updateMapData: updateMapData,
      updateColumnHeaders: updateColumnHeaders
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DataControls);
