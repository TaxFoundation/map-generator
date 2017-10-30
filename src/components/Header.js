import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends Component {
  render() {
    return (
      <AppBar
        className="header"
        showMenuIconButton={false}
        title="US Map Generator"
      />
    );
  }
}

export default Header;