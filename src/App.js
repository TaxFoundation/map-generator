import React, { Component, createContext } from 'react';
import { Provider } from 'react-redux';
import defaultState from './defaultState';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';
import Header from './components/Header';
import Map from './components/Map';
import Controls from './components/Controls';

const MapGeneratorContext = createContext(defaultState());

class Provider extends Component {
  state = defaultState();

  render() {
    return (
      <MapGeneratorContext.Provider value={{ state: this.state }}>
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
