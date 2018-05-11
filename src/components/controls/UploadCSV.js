import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import MapGeneratorContext from '../../Context';
import { readCSVFile } from '../../helpers';

const UploadButtonContainer = styled.div`
  margin-bottom: 1rem;
`;

class UploadCSV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: 'primary',
      showWarning: false,
      warningMessage: '',
    };
  }

  changeWarningMessage = message => this.setState({ warningMessage: message });

  openWarning = () => this.setState({ showWarning: true });

  closeWarning = () => this.setState({ showWarning: false });

  changeButtonColor = color => this.setState({ buttonColor: color });

  triggerWarning = (warning, color) => {
    this.openWarning();
    this.changeWarningMessage(warning);
    this.changeButtonColor('secondary');
  };

  render() {
    return (
      <MapGeneratorContext.Consumer>
        {context => (
          <UploadButtonContainer>
            <input
              accept="csv,CSV"
              id="file"
              onChange={e => {
                let files = e.target.files;
                if (files.length > 1) {
                  this.triggerWarning('Please only upload one file.');
                } else if (files[0].type !== 'text/csv') {
                  console.log(files[0].type);
                  this.triggerWarning('Please only upload CSV files.');
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
                  context.updateState('filename', `Using ${files[0].name}`);
                }
              }}
              style={{ display: 'none' }}
              type="file"
            />
            <label htmlFor="file">
              <Button
                color={this.state.buttonColor}
                component="span"
                variant="raised"
                fullWidth={true}
              >
                {context.state.filename}
              </Button>
            </label>
            <Snackbar
              anchorOrigin={{
                horizontal: 'center',
                vertical: 'top',
              }}
              autoHideDuration={10000}
              open={this.state.showWarning}
              message={this.state.warningMessage}
            />
          </UploadButtonContainer>
        )}
      </MapGeneratorContext.Consumer>
    );
  }
}

UploadCSV.propTypes = {
  updateRawColumnHeaders: PropTypes.func,
  updateRawData: PropTypes.func,
};

export default UploadCSV;
