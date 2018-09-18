import * as React from 'react';
import Document from 'next/document';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '@/client/redux/reducers';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

class App extends Document {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} user={this.props.user} />
      </Provider>
    );
  }
}

export default App;
