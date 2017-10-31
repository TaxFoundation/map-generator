import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class DataControls extends Component {
  render() {
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
      </div>
    );
  }
}

export default DataControls;