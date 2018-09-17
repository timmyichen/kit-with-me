import axios from 'axios';

export function login({ email, password }) {
  return async dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST',
    });

    const user = await axios.post('/api/user/login', { email, password });

    dispatch({
      type: 'LOGIN_SUCCESS',
      user,
    });
  };
}

export function signup({ firstName, lastName, email, password }) {
  console.log('wew');
  return async dispatch => {
    console.log('dispatching');
    dispatch({
      type: 'SIGNUP_REQUEST',
    });
    console.log('here');
    const user = await axios.post('/api/user/signup', {
      firstName,
      lastName,
      email,
      password,
    });

    console.log('ayy');
    dispatch({
      type: 'SIGNUP_REQUEST',
      user,
    });
  };
}
