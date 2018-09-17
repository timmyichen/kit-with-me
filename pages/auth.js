import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '@/client/layout/Layout.react';
import Signup from '@/client/auth/Signup.react';
import { signup } from '@/client/auth/actions';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  signup: obj => dispatch(signup(obj)),
});

class authIndex extends React.Component {
  static async getInitialProps({ asPath }) {
    if (asPath.toLowerCase().includes('signup')) {
      return { isSignup: true };
    }

    return { isSignup: false };
  }

  render() {
    console.log(this.props);
    return (
      <Layout>
        <Signup signup={this.props.signup} />
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(authIndex);
