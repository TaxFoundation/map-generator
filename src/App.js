import React, { Component } from 'react';
import data from './data/states';
import MapGeneratorContext from './Context';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';
import Header from './components/Header';
import Map from './components/Map';
import Controls from './components/Controls';

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
      colorMode: 'lch',
      colors: ['#edf8b1', '#2c7fb8'],
      dataType: 'sequential',
      domain: [0, 56],
      id: 'id',
      mapData: defaultData,
      mapType: 'states',
      rawColumnHeaders: ['id', 'abbr', 'name', 'value'],
      rawData: data,
      scale: 'linear',
      steps: 10,
      value: 'value',
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
                this.setState({
                  mapData: this.state.rawData.map(d => {
                    return {
                      id: d[this.state.id],
                      value: d[this.state.value],
                    };
                  }),
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
