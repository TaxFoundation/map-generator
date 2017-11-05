import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import SelectList from '../components/controls/SelectList';
import Snackbar from 'material-ui/Snackbar';
import { readCSVFile } from '../helpers';
import {
  updateRawData,
  updateRawColumnHeaders,
  updateMapType,
  updateMapData,
  updateId
} from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class DataControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: 'Upload a CSV File',
      showWarning: false,
      warningMessage: '',
      buttonColor: 'primary'
    };
  }

  changeUploadText = text => this.setState({filename: text})

  changeWarningMessage = message => this.setState({ warningMessage: message })

  openWarning = () => this.setState({ showWarning: true });

  closeWarning = () => this.setState({ showWarning: false });

  changeButtonColor = color => this.setState({ buttonColor: color });

  triggerWarning = (warning, button, color) => {
    this.openWarning();
    this.changeWarningMessage(warning);
    this.changeUploadText(button);
    this.changeButtonColor('accent');
  }

  render() {
    return (
      <div className="panel__section">
        <Typography type="subheading">Upload Data</Typography>
        <input
          accept="csv,CSV"
          id="file"
          onChange={(e) => {
            let files = e.target.files;
            if (files.length > 1) {
              this.triggerWarning(
                'Please only upload one file.',
                'Upload Only One CSV File'
              );
            } else if (files[0].type !== 'text/csv') {
              this.triggerWarning(
                'Please only upload CSV files.',
                'Upload Only One CSV File'
              );
            } else {
              if (this.state.buttonColor !== 'primary') {
                this.changeButtonColor('primary');
              }
              if (this.state.showWarning) {
                this.closeWarning();
              }
              readCSVFile(
                files[0],
                this.props.updateRawData,
                this.props.updateRawColumnHeaders
              );
              this.changeUploadText(`Using ${files[0].name}`);
            }
          }}
          style={{display: 'none'}}
          type="file"
        />
        <label htmlFor="file">
          <Button color={this.state.buttonColor} component="span" raised>
            {this.state.filename}
          </Button>
        </label>
        <Divider />
        <Typography type="subheading">Describe Your Data</Typography>
        <SelectList
          listName="map-type"
          label="What type of US map is it?"
          types={['states', 'counties']}
          update={this.props.updateMapType}
          value={this.props.mapType}
          case='first'
        />
        <SelectList
          list-name="id-select"
          label="Which column is the state ID?"
          types={this.props.rawColumnHeaders }
          update={this.props.updateId}
          value={this.props.id}
        />
        <Snackbar
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top'
          }}
          autoHideDuration={10000}
          open={this.state.showWarning}
          message={this.state.warningMessage}
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
    id: state.id
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
      updateId: updateId
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DataControls);
