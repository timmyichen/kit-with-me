// @flow

import * as React from 'react';

class Signup extends React.Component {
  onSignup = async () => {
    await this.props.signup({});
    console.log('yay');
  };

  render() {
    return (
      <div className="ui container">
        <button className="ui button" onClick={this.onSignup}>
          signup
        </button>
      </div>
    );
  }
}

export default Signup;
