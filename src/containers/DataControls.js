import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';

class DataControls extends Component {
  constructor() {
    super();

    this.state = {
      fileUploaded: false,
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
            value={this.props.dataType}
          >
            { types.map((t) => {
              return (
                <MenuItem
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
        { this.state.fileUploaded
          ? <DataSettings />
          : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapData: state.mapData,
    dataType: state.dataType,
    columnHeaders: state.columnHeaders,
    domain: state.domain,
    scale: state.scale
  };
}

export default connect(mapStateToProps)(DataControls);