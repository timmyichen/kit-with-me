// @flow

import * as React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui large secondary pointing menu">
          <a className="active item">Home</a>
          <a className="item">About</a>
          <a className="item">Privacy</a>
          <div className="right item">
            <a className="ui button">Log In</a>
            <a className="ui button">Sign Up</a>
          </div>
        </div>
        <style jsx>{`
          .ui.inverted.pointing.menu {
            border: none;
          }
        `}</style>
      </div>
    );
  }
}

export default Header;
