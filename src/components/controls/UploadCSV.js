import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { readCSVFile } from '../../helpers';

class UploadCSV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: 'Upload a CSV File',
      showWarning: false,
      warningMessage: '',
      buttonColor: 'primary'
    };
  }

  changeUploadText = text => this.setState({ filename: text });

  changeWarningMessage = message => this.setState({ warningMessage: message });

  openWarning = () => this.setState({ showWarning: true });

  closeWarning = () => this.setState({ showWarning: false });

  changeButtonColor = color => this.setState({ buttonColor: color });

  triggerWarning = (warning, button, color) => {
    this.openWarning();
    this.changeWarningMessage(warning);
    this.changeUploadText(button);
    this.changeButtonColor('accent');
  };

  render() {
    return (
      <div>
        <input
          accept="csv,CSV"
          id="file"
          onChange={e => {
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
          style={{ display: 'none' }}
          type="file"
        />
        <label htmlFor="file">
          <Button color={this.state.buttonColor} component="span" raised>
            {this.state.filename}
          </Button>
        </label>
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

export default UploadCSV;