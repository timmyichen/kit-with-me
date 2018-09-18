// @flow

import { connect } from 'react-redux';
import { loadUser } from '@/client/auth/actions';

const mapDispatchToProps = dispatch => ({
  loadUser: obj => dispatch(loadUser(obj)),
});

export default component =>
  connect(
    null,
    mapDispatchToProps,
  )(component);
