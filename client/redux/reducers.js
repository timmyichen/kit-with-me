import { combineReducers } from 'redux';
import { authReducers, userReducers } from '@/client/auth/reducers';

export default combineReducers({
  auth: authReducers,
  user: userReducers,
});
