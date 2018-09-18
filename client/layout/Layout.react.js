// @flow

import * as React from 'react';
import Head from 'next/head';
import Header from '@/client/layout/Header.react';

type Props = {
  path: string,
};

class Layout extends React.Component<Props> {
  render() {
    return (
      <div>
        <Head>
          <title>Keep in Touch</title>
        </Head>
        <Header path={this.props.path} />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
