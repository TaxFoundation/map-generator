import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import SelectList from '../components/controls/SelectList';
import { readFile } from '../helpers';
import {
  updateRawData,
  updateMapType,
  updateMapData,
  updateColumnHeaders
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class DataControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: 'Upload a CSV File'
    };
  }

  render() {
    return (
      <div className="panel__section">
        <Typography type="subheading">Upload Data</Typography>
        <input
          accept="csv,CSV"
          id="file"
          onChange={(e) => {
            if (e.target.files.length > 1) {
              alert('Please only upload one file');
              return;
            } else {
              readFile(e.target.files[0], this.props.updateRawData);
              this.setState({filename: `Using ${e.target.files[0].name}`});
            }
          }}
          style={{display: 'none'}}
          type="file"
        />
        <label htmlFor="file">
          <Button color="primary" component="span" raised>{this.state.filename}</Button>
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
      updateRawData: updateRawData,
      updateMapType: updateMapType,
      updateMapData: updateMapData,
      updateColumnHeaders: updateColumnHeaders
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DataControls);
