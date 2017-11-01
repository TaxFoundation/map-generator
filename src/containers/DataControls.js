import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {
  updateMapType,
  updateMapData,
  updateDomain,
  updateDataType,
  updateColumnHeaders,
  updateSteps,
  updateColors
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class DataControls extends Component {
  constructor() {
    super();

    this.state = {
      fileUploaded: false
    };
  }

  render() {
    const DataSettings = () => {
      const types = ['sequential', 'divergent', 'qualitative'];

      return (
        <div>
          <h3>Describe Your Data</h3>
          <SelectField
            autoWidth={true}
            floatingLabelText="What Type of Data is This?"
            onChange={(e, i, v) => {this.props.updateDataType(v);}}
            value={this.props.dataType}
          >
            {types.map(t => {
              return (
                <MenuItem
                  key={`data-type-${t}`}
                  value={t}
                  primaryText={t.charAt(0).toLocaleUpperCase() + t.slice(1)}
                />
              );
            })}
          </SelectField>
        </div>
      );
    };

    return (
      <div className="controls__data panel__section">
        <h3>Upload Data</h3>
        <RaisedButton
          containerElement="label"
          fullWidth={true}
          label="Choose File to Upload"
          labelPosition="before"
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
        </RaisedButton>
        {this.state.fileUploaded ? <DataSettings /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapData: state.mapData,
    mapType: state.mapType,
    dataType: state.dataType,
    columnHeaders: state.columnHeaders,
    domain: state.domain,
    scale: state.scale,
    steps: state.steps,
    colors: state.colors
  };
}

// anything returned will end up as props in DataControls
function mapDispatchToProps(dispatch) {
  // whenever one of these is called, it's passed to reducers
  return bindActionCreators({
    updateMapType: updateMapType,
    updateMapData: updateMapData,
    updateDomain: updateDomain,
    updateDataType: updateDataType,
    updateColumnHeaders: updateColumnHeaders,
    updateSteps: updateSteps,
    updateColors: updateColors
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataControls);
