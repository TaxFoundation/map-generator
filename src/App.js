import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';
import Header from './components/Header';
import Map from './components/Map';
import Controls from './components/Controls';

class App extends Component {
  theme = () => {
    return createMuiTheme({
      palette: {
        primary: blueGrey,
      },
    });
  };

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={this.theme}>
          <div className="app">
            <Header />
            <Map />
            <Controls />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
