import nextConnectRedux from 'next-connect-redux';
import { createStore } from 'redux';
import reducers from './reducers';

export const initStore = initialState => createStore(reducers, initialState);

export const nextConnect = nextConnectRedux(initStore);
