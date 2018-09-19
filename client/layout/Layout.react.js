// @flow

import * as React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Header from '@/client/layout/Header.react';
import AuthedHeader from '@/client/layout/AuthedHeader.react';
import { loadUser } from '@/client/auth/actions';

type Props = {
  path: string,
  noAuthHeader?: boolean,
  loadUser: () => void,
  user?: Object,
};

class Layout extends React.Component<Props> {
  static defaultProps = {
    noAuthHeader: false,
    user: null,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { user, path, noAuthHeader } = this.props;

    const isLoggedIn = !user.error;

    const HeaderComponent = isLoggedIn && !noAuthHeader ? AuthedHeader : Header;
    return (
      <div>
        <Head>
          <title>Keep in Touch</title>
        </Head>
        <HeaderComponent path={path} isLoggedIn={isLoggedIn} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({ state, user: state.user });

const mapDispatchToProps = dispatch => ({
  loadUser: obj => dispatch(loadUser(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
