// @flow

import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';

class Signup extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  onSignup = async () => {
    await this.props.signup(this.state);
    console.log('yay');
  };

  onChangeField = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <div className="signup-page">
        <Form className="signup-form">
          <Form.Field>
            <label>First Name</label>
            <input
              name="firstName"
              onChange={this.onChangeField}
              value={firstName}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              name="lastName"
              onChange={this.onChangeField}
              value={lastName}
              placeholder="Last Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              onChange={this.onChangeField}
              value={email}
              placeholder="Email"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              onChange={this.onChangeField}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Field>
          <Button type="submit" onClick={this.onSignup}>
            Sign Up
          </Button>
        </Form>
        <style jsx>{`
          .signup-page :global(.signup-form) {
            width: 400px;
            margin: 30px auto;
          }
        `}</style>
      </div>
    );
  }
}

export default Signup;
