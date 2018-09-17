// @flow

import * as React from 'react';
import Head from 'next/head';
import Header from '@/client/layout/Header.react';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Keep in Touch</title>
        </Head>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
