// @flow

import * as React from 'react';
import Link from 'next/link';

class Header extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui large secondary pointing menu">
          <a className="active item">Home</a>
          <a className="item">About</a>
          <a className="item">Privacy</a>
          <div className="right item">
            <Link href="/auth" as="/login">
              <a className="ui button">Log In</a>
            </Link>
            <Link href="/auth" as="/signup">
              <a className="ui button">Sign Up</a>
            </Link>
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
