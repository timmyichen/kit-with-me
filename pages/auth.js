import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '@/client/layout/Layout.react';
import Signup from '@/client/auth/Signup.react';
import Login from '@/client/auth/Login.react';
import { signup, login } from '@/client/auth/actions';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  signup: obj => dispatch(signup(obj)),
  login: obj => dispatch(login(obj)),
});

class authIndex extends React.Component {
  static async getInitialProps({ asPath }) {
    if (asPath.toLowerCase().includes('signup')) {
      return { isSignup: true };
    }

    return { isSignup: false };
  }

  render() {
    const { isSignup } = this.props;
    console.log(this.props);
    return (
      <Layout>
        {isSignup ? (
          <Signup signup={this.props.signup} />
        ) : (
          <Login login={this.props.login} />
        )}
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(authIndex);
