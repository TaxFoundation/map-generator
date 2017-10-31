import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
import Map from './components/Map';
import Controls from './components/Controls';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className="app">
            <Header></Header>
            <Map></Map>
            <Controls></Controls>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
