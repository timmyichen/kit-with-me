import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '@/client/redux/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" type="text/css" href="/css/semantic.min.css" />
        </Head>
        <body>
          <Provider store={store}>
            <Main />
          </Provider>
          <NextScript />
        </body>
      </html>
    );
  }
}
