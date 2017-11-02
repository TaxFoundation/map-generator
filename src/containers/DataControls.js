import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import MapType from '../components/controls/MapType';
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
        <h3>Upload Data</h3>
        <Button
          component="label"
          label="Choose File to Upload"
          raised
        >
          <input
            type="file"
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              width: '100%',
              opacity: 0
            }}
          />
        </Button>
        <h3>Describe Your Data</h3>
        <MapType
          mapType={this.props.mapType}
          updateMapType={this.props.updateMapType}
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
