import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
import Map from './components/Map';
import Controls from './components/Controls';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <Header></Header>
          <Map></Map>
          <Controls></Controls>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
