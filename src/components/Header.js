import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Header extends Component {
  render() {
    return (
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography type="title">
            US Map Generator
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;