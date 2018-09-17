// @flow

import * as React from 'react';
import Head from 'next/head';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" type="text/css" href="/css/semantic.min.css" />
          <title>Keep in Touch</title>
        </Head>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
