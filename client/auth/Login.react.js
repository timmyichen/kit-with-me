// @flow

import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onLogin = async () => {
    try {
      await this.props.login(this.state);
    } catch (e) {
      console.error(e.message);
    }
  };

  onChangeField = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, password } = this.state;

    return (
      <div className="login-page">
        <Form className="login-form">
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
          <Button type="submit" onClick={this.onLogin}>
            Log In
          </Button>
        </Form>
        <style jsx>{`
          .login-page :global(.login-form) {
            width: 400px;
            margin: 30px auto;
          }
        `}</style>
      </div>
    );
  }
}

export default Login;
