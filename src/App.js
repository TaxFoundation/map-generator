import React, { Component } from 'react';
import data from './data/states';
import MapGeneratorContext from './Context';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blueGrey, pink } from 'material-ui/colors';
import Header from './components/Header';
import Map from './components/Map';
import Controls from './components/Controls';
import {
  sequentialColorPalettes,
  divergentColorPalettes,
  qualitativeColorPalettes,
} from './data/colorPalette';

class Provider extends Component {
  constructor() {
    super();

    const defaultData = data.map(d => {
      return {
        id: d.id,
        value: d.value,
      };
    });

    this.state = {
      activeDataTypeColors: {
        sequential: sequentialColorPalettes[0].palette,
        divergent: divergentColorPalettes[0].palette,
        qualitative: qualitativeColorPalettes[0].palette,
      },
      colorMode: 'lch',
      colors: sequentialColorPalettes[0].palette,
      dataType: 'sequential',
      domain: [0, 56],
      id: 'id',
      filename: 'Upload your CSV',
      mapData: defaultData,
      mapType: 'states',
      rawColumnHeaders: ['id', 'abbr', 'name', 'value'],
      rawData: data,
      scale: 'linear',
      steps: 10,
      value: 'value',
      format: 'number',
      decimals: 0,
      comma: true,
      unit: 1,
    };
  }

  render() {
    return (
      <MapGeneratorContext.Provider
        value={{
          state: this.state,
          updateState: (pieceOfState, data) => {
            this.setState({
              [pieceOfState]: data,
            });
          },
          updateMapData: (pieceOfState, data) => {
            this.setState(
              {
                [pieceOfState]: data,
              },
              () => {
                const newData = this.state.rawData.map(d => {
                  return {
                    id: d[this.state.id],
                    value: +d[this.state.value],
                  };
                });

                const newValues = newData.map(d => d.value);
                const newMin = Math.min(...newValues);
                const newMax = Math.max(...newValues);

                this.setState({
                  domain: [newMin, newMax],
                  mapData: newData,
                });
              }
            );
          },
        }}
      >
        {this.props.children}
      </MapGeneratorContext.Provider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: pink,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider>
          <div className="app">
            <Header />
            <Map />
            <Controls />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
